import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import { QRsActions } from '../types'
import { RootState } from 'data/store'
import { TQRItem, TLinkDecrypted, TQRSet } from 'types'
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!web-workers/qrs-worker'
import { QRsWorker } from 'web-workers/qrs-worker'
import { wrap, Remote, proxy } from 'comlink'
import { sleep, alertError } from 'helpers'
import { plausibleApi, qrManagerApi, qrsApi } from 'data/api'
import * as qrManagerActions from '../../qr-manager/actions'
import { QRManagerActions } from '../../qr-manager/types'
import * as actionsAsyncUser from '../../user/async-actions'

const mapQRsWithLinksAction = ({
  setId,
  links,
  qrs,
  callback
}: {
  setId: string,
  links: TLinkDecrypted[],
  qrs: TQRItem[],
  callback?: () => void,
}) => {
  return async (
    dispatch: Dispatch<QRsActions> & Dispatch<QRManagerActions>,
    getState: () => RootState
  ) => {
    dispatch(actionsQR.setLoading(true))
    const {
      user: {
        dashboardKey,
        chainId,
        address,
        provider
      }
    } = getState()
    try {
      let currentPercentage = 0

      if (!dashboardKey) {
        alert('create or retrieve dashboard key STARTED')
        // @ts-ignore
        const dashboardKeyCreated = await actionsAsyncUser.getDashboardKey(
          dispatch,
          chainId as number,
          address,
          provider,
          false
        )
        if (dashboardKeyCreated !== undefined) {
          // @ts-ignore
          dashboardKey = dashboardKeyCreated
        }
        alert('create or retrieve dashboard key FINISHED')
        if (!dashboardKey) {
          alertError('Dashboard Key is not available')
          return dispatch(actionsQR.setLoading(false))
        }
      }

      const start = +(new Date())

      const updateProgressbar = async (value: number) => {
        if (value === currentPercentage || value < currentPercentage) { return }
        currentPercentage = value
        dispatch(actionsQR.setMappingLoader(currentPercentage))
        await sleep(1)
      }

      const RemoteChannel = wrap<typeof QRsWorker>(new Worker())
      const qrsWorker: Remote<QRsWorker> = await new RemoteChannel(proxy(updateProgressbar));
  
      const qrArrayMapped = await qrsWorker.mapQrsWithLinks(qrs, links, dashboardKey)
      console.log((+ new Date()) - start)
      const result = await qrsApi.mapLinks(setId, qrArrayMapped)
      
      if (result.data.success) {
        plausibleApi.invokeEvent({
          eventName: 'qr_connect',
          data: {
            success: 'yes'
          }
        })
        const qrs: { data: { qr_sets: TQRSet[] } } = await qrsApi.get()
        dispatch(actionsQR.updateQrs(qrs.data.qr_sets))

        const qrManagerData = await qrManagerApi.get()
        const { success, items } = qrManagerData.data
        if (success) {
          dispatch(qrManagerActions.setItems(items))
        }

        callback && callback()
      }
      
      if (!result.data.success) {
        alertError('Couldn’t connect links to QRs, please try again')
      }
      dispatch(actionsQR.setMappingLoader(0))
    } catch (err) {
      plausibleApi.invokeEvent({
        eventName: 'qr_connect',
        data: {
          success: 'no'
        }
      })
      alertError('Couldn’t connect links to QRs, please try again')
      dispatch(actionsQR.setMappingLoader(0))
      console.error(err)
    }
    dispatch(actionsQR.setLoading(false))
  }
}

export default mapQRsWithLinksAction