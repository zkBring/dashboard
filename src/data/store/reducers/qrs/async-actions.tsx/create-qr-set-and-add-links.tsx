import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import { QRsActions } from '../types'
import { RootState } from 'data/store'
import {
  TQRSet
} from 'types'
import {
  qrsApi,
  campaignsApi
} from 'data/api'
import {
  sleep,
  createQuantityGroups,
  createWorkers,
  terminateWorkers,
  decryptLinks,
  alertError
} from 'helpers'
import { QRsWorker } from 'web-workers/qrs-worker'
import { plausibleApi, qrManagerApi } from 'data/api'
import * as qrManagerActions from '../../qr-manager/actions'
import { QRManagerActions } from '../../qr-manager/types'
import * as actionsAsyncUser from '../../user/async-actions'
import * as actionsUser from '../../user/actions'
import { UserActions } from '../../user/types'
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!web-workers/qrs-worker'
import { wrap, Remote, proxy } from 'comlink'

const createQRSetAndAddLinks = ({
  mappingPageRedirect,
  title,
  campaignId,
  batchId,
  tokenAddress,
  wallet,
  customClaimHost,
  successCallback,
  errorCallback
}: {
  mappingPageRedirect: () => void,
  title: string,
  campaignId: string
  batchId: string,
  tokenAddress: string,
  wallet: string,
  customClaimHost: string,
  successCallback?: (
    qr_id: string | number
  ) => void,
  errorCallback?: () => void,
}) => {
  return async (
    dispatch: Dispatch<QRsActions> & Dispatch<QRManagerActions> & Dispatch<UserActions>,
    getState: () => RootState
  ) => {
    let {
      user: {
        address,
        workersCount,
        chainId
      }
    } = getState()
    dispatch(actionsQR.setLoading(true))

    const callback = async (
      dashboardKey: string
    ) => {
      try {
        mappingPageRedirect && mappingPageRedirect()
        const getLinksResult = await campaignsApi.getBatch(campaignId, batchId)
        if (getLinksResult.data.success) {

          const { claim_links } = getLinksResult.data
          let currentPercentageUpload = 0
          let currentPercentageMapping = 0

          const neededWorkersCount = claim_links.length <= 1000 ? 1 : workersCount
          const start = +(new Date())

          const uploadProgressbar = async (value: number) => {
            if (value === currentPercentageUpload || value < currentPercentageUpload) { return }
            currentPercentageUpload = value
            dispatch(actionsQR.setUploadLoader(currentPercentageUpload))
            await sleep(1)
          }

          const quantityGroups = createQuantityGroups(claim_links.length, neededWorkersCount)
          const workers = await createWorkers(
            quantityGroups,
            'qrs',
            uploadProgressbar
          )

          const qrArray = await Promise.all(workers.map(({
            worker,
            data
          }) => (worker as Remote<QRsWorker>).prepareQRs(data as number, dashboardKey)))

          console.log((+ new Date()) - start)
          terminateWorkers(workers)

          const newQr: TQRSet = {
            set_name: title,
            qr_quantity: claim_links.length,
            status: 'NOT_SENT_TO_PRINTER',
            creator_address: address,
            qr_array: qrArray.flat(),
            campaign: {
              title: '',
              campaign_id: '1'
            }
          }
          
          const qrSetCreateResult = await qrsApi.create(newQr)
          if (qrSetCreateResult.data.success) {
            plausibleApi.invokeEvent({
              eventName: 'new_qr_set'
            })

            const qrSetItemsResult = await qrsApi.getQRs((qrSetCreateResult.data.qr_set || {}).set_id || '')

            if (qrSetItemsResult.data.success) {
              const decryptedLinks = decryptLinks({
                links: claim_links,
                dashboardKey: String(dashboardKey),
                tokenAddress,
                userAddress: address,
                chainId: chainId as number,
                wallet,
                customClaimHost
              })

              const mappingProgressbar = async (value: number) => {
                if (value === currentPercentageMapping || value < currentPercentageMapping) { return }
                currentPercentageMapping = value
                dispatch(actionsQR.setMappingLoader(currentPercentageMapping))
                await sleep(1)
              }
        
              const RemoteChannel = wrap<typeof QRsWorker>(new Worker())
              const qrsWorker: Remote<QRsWorker> = await new RemoteChannel(proxy(mappingProgressbar));
          
              const qrArrayMapped = await qrsWorker.mapQrsWithLinks(
                qrSetItemsResult.data.qr_array,
                decryptedLinks,
                dashboardKey
              )
              console.log((+ new Date()) - start)
              const mapLinksResult = await qrsApi.mapLinks((qrSetCreateResult.data.qr_set || {}).set_id || '', qrArrayMapped)
              if (mapLinksResult.data.success) {
                const qrManagerData = await qrManagerApi.get()
                const { success, items } = qrManagerData.data
                if (success) {
                  dispatch(qrManagerActions.setItems(items))
                }

                const qrs: { data: { qr_sets: TQRSet[] } } = await qrsApi.get()
                dispatch(actionsQR.updateQrs(qrs.data.qr_sets))              
                
                successCallback && successCallback((
                  qrSetCreateResult.data.qr_set || {}).set_id || ''
                )
              }
            }
          } else {
            throw new Error('QR set was not created. Check console for more information')
          }
          dispatch(actionsQR.setMappingLoader(0))
          dispatch(actionsQR.setUploadLoader(0)) 
        }
      } catch (err) {
        errorCallback && errorCallback()
        alertError('Couldn’t create QR set, please check console')
        dispatch(actionsQR.setMappingLoader(0))
        dispatch(actionsQR.setUploadLoader(0))
        console.error(err)
      }
    }

    let dashboardKey = actionsAsyncUser.useDashboardKey(
      getState
    )

    if (!dashboardKey) {
      dispatch(actionsQR.setLoading(false))
      dispatch(actionsUser.setDashboardKeyPopup(true))
      dispatch(actionsUser.setDashboardKeyPopupCallback(callback))
      return
    }
    
    callback(dashboardKey)
    dispatch(actionsQR.setLoading(false))
  }
}

export default createQRSetAndAddLinks