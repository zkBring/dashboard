import { Dispatch } from 'redux'
import * as actionsDispenser from '../actions'
import { DispensersActions } from '../types'
import { RootState } from 'data/store'
import { TLinkDecrypted, TDispenser, TDispenserStatus } from 'types'
import {  dispensersApi, qrManagerApi, plausibleApi } from 'data/api'
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!web-workers/qrs-worker'
import { QRsWorker } from 'web-workers/qrs-worker'
import { wrap, Remote, proxy } from 'comlink'
import { sleep, alertError, defineIfLinksHasEqualContents } from 'helpers'
import axios from 'axios'
import * as qrManagerActions from '../../qr-manager/actions'
import { QRManagerActions } from '../../qr-manager/types'
import * as actionsAsyncUser from '../../user/async-actions'

const addLinksToDispenser = ({
  itemId,
  encryptedMultiscanQREncCode,
  links,
  linksCount,
  currentStatus,
  callback
}: {
  itemId: string,
  encryptedMultiscanQREncCode: string,
  links: TLinkDecrypted[],
  linksCount: number,
  currentStatus: TDispenserStatus,
  callback?: () => void,
}) => {
  return async (
    dispatch: Dispatch<DispensersActions> & Dispatch<QRManagerActions>,
    getState: () => RootState
  ) => {
    dispatch(actionsDispenser.setLoading(true))

    let {
      user: {
        dashboardKey,
        address,
        chainId,
        provider,
        connectorId
      }
    } = getState()

    if (!dashboardKey) {
      alert('create or retrieve dashboard key STARTED')
      // @ts-ignore
      const dashboardKeyCreated = await actionsAsyncUser.getDashboardKey(
        dispatch,
        chainId as number,
        address,
        provider,
        connectorId
      )
      if (dashboardKeyCreated !== undefined) {
        // @ts-ignore
        dashboardKey = dashboardKeyCreated
      }
      alert('create or retrieve dashboard key FINISHED')
      if (!dashboardKey) {
        alertError('Dashboard Key is not available')
        return dispatch(actionsDispenser.setLoading(false))
      }
    }

    try {
      let currentPercentage = 0

      
      dispatch(actionsDispenser.setLoading(true))

      const updateProgressbar = async (value: number) => {
        if (value === currentPercentage || value < currentPercentage) { return }
        currentPercentage = value
        dispatch(actionsDispenser.setMappingLoader(currentPercentage))
        await sleep(1)
      }

      const RemoteChannel = wrap<typeof QRsWorker>(new Worker())
      const qrsWorker: Remote<QRsWorker> = await new RemoteChannel(proxy(updateProgressbar));
  
      const qrArrayMapped = await qrsWorker.prepareLinksForDispenser(
        encryptedMultiscanQREncCode,
        links,
        dashboardKey as string
      )
      const apiMethod = linksCount > 0 && currentStatus === 'ACTIVE' ? dispensersApi.updateLinks : dispensersApi.mapLinks
      const linksHasEqualContents = defineIfLinksHasEqualContents(links)
      const result = await apiMethod(itemId, qrArrayMapped, linksHasEqualContents)
      
      if (result.data.success) {
        plausibleApi.invokeEvent({
          eventName: 'multiqr_connect',
          data: {
            success: 'yes',
            address,
            itemId
          }
        })
        const result: { data: { dispensers: TDispenser[] } } = await dispensersApi.get()
        dispatch(actionsDispenser.setDispensers(result.data.dispensers))

        const qrManagerData = await qrManagerApi.get()
        const { success, items } = qrManagerData.data
        if (success) {
          dispatch(qrManagerActions.setItems(items))
        }
      
        callback && callback()
      }
      
      if (!result.data.success) {
        plausibleApi.invokeEvent({
          eventName: 'multiqr_connect',
          data: {
            success: 'no',
            address,
            itemId
          }
        })
        alertError('Couldn’t connect links to QRs, please try again')
      }
      dispatch(actionsDispenser.setMappingLoader(0))
    } catch (err) {
      plausibleApi.invokeEvent({
        eventName: 'multiqr_connect',
        data: {
          success: 'no',
          address,
          itemId
        }
      })
      if (axios.isAxiosError(err)) {
        const { response } = err
        if (response && response.data && response.data.error) {
          alertError(response.data.error)
        } else {
          alertError('Some error occured. Please check console')
        }
      }
      
      dispatch(actionsDispenser.setMappingLoader(0))
      console.error(err)
    }
    dispatch(actionsDispenser.setLoading(false))
  }
}

export default addLinksToDispenser