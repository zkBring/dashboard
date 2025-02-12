import { Dispatch } from 'redux'
import * as actionsDispensers from '../../../dispensers/actions'
import { DispensersActions } from '../../../dispensers/types'
import * as actionsCampaign from '../../actions'
import { CampaignActions } from '../../types'
import { UserActions } from '../../../user/types'
import { RootState } from 'data/store'
import { dispensersApi, campaignsApi } from 'data/api'
import {
  alertError,
  momentNoOffsetWithTimeUpdate,
  momentNoOffsetGetTime,
  getNextDayData,
  defineIfLinksHasEqualContents,
  decryptLinks,
  sleep
} from 'helpers'
import { TDispenser } from 'types'
import { encrypt } from 'lib/crypto'

// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!web-workers/qrs-worker'
import { QRsWorker } from 'web-workers/qrs-worker'
import { wrap, Remote, proxy } from 'comlink'

type TCreateReclaimArgs = {
  dispatch: Dispatch<DispensersActions> & Dispatch<UserActions> & Dispatch<CampaignActions>
  getState: () => RootState
  campaignId: string
  batchId: string
  successCallback?: (
    dispenser_id: string | number
  ) => void,
  errorCallback?: () => void,
}

const createReclaimAndAddLinks = async ({
  dispatch,
  getState,
  campaignId,
  batchId,
  successCallback,
  errorCallback
}: TCreateReclaimArgs) => {
  dispatch(actionsDispensers.setLoading(true))

  let {
    user: {
      sdk,
      address,
      chainId,
      dashboardKey
    },
    campaign: {
      tokenAddress,
      title,
      reclaimInstagramId
    }
  } = getState()

  const secretKeyPair = sdk?.utils.generateAccount(12, true)
  const encKeyPair = sdk?.utils.generateAccount(12, true)
  if (!secretKeyPair) { return alertError('secretKeyPair is not provided') }
  if (!encKeyPair) { return alertError('encKeyPair is not provided') }

  const encryptedMultiscanQRSecret = encrypt(secretKeyPair.shortCode, dashboardKey as string)
  const encryptedMultiscanQREncCode = encrypt(encKeyPair.shortCode, dashboardKey as string)
  const date = getNextDayData()
  const dispenserTime = momentNoOffsetGetTime(+date)
  const dateString = momentNoOffsetWithTimeUpdate(date, Number(dispenserTime.hours.value), Number(dispenserTime.minutes.value))

  const newDispenser: TDispenser = {
    encrypted_multiscan_qr_secret: encryptedMultiscanQRSecret,
    multiscan_qr_id: secretKeyPair.address,
    claim_start: +(new Date(dateString)),
    encrypted_multiscan_qr_enc_code: encryptedMultiscanQREncCode,
    title: `Reclaim set for ${title || `Campaign ${campaignId}`}`,
    dynamic: false,
    reclaim: true,
    instagram_follow_id: reclaimInstagramId
  }

  // create dispenser
  const createDispenserResult = await dispensersApi.create(newDispenser)
  if (createDispenserResult.data.success) {
    // get links
    const getLinksResult = await campaignsApi.getBatch(campaignId, batchId)
    let encKey = String(dashboardKey)

    if (getLinksResult.data.success) {
      const { claim_links, batch } = getLinksResult.data

      const decryptedLinks = decryptLinks({
        links: claim_links,
        dashboardKey: encKey,
        tokenAddress: tokenAddress as string,
        chainId: chainId as number
      })

      let currentPercentage = 0

      const updateProgressbar = async (value: number) => {
        if (value === currentPercentage || value < currentPercentage) { return }
        currentPercentage = value
        dispatch(actionsDispensers.setMappingLoader(currentPercentage))
        await sleep(1)
      }

      const RemoteChannel = wrap<typeof QRsWorker>(new Worker())
      const qrsWorker: Remote<QRsWorker> = await new RemoteChannel(proxy(updateProgressbar));

      const qrArrayMapped = await qrsWorker.prepareLinksForDispenser(
        encryptedMultiscanQREncCode,
        decryptedLinks,
        dashboardKey as string
      )
      const linksHasEqualContents = defineIfLinksHasEqualContents(decryptedLinks)
      const addLinksResult = await dispensersApi.mapLinks(createDispenserResult.data.dispenser.dispenser_id, qrArrayMapped, linksHasEqualContents)
      if (addLinksResult.data.success) {
        const result: { data: { dispensers: TDispenser[] } } = await dispensersApi.get()
        dispatch(actionsDispensers.setDispensers(result.data.dispensers))

        if (successCallback) {
          successCallback(
            createDispenserResult.data.dispenser.dispenser_id
          )
        }
      }
    }
  } else {
    throw new Error('Reclaim was not created. Check console for more information')
  }
  dispatch(actionsDispensers.setMappingLoader(0))
  dispatch(actionsCampaign.clearCampaign())
  dispatch(actionsDispensers.setLoading(false))
}

export default createReclaimAndAddLinks
