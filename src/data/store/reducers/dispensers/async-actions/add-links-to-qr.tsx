import { Dispatch } from 'redux'
import * as actionsDispenser from '../actions'
import { DispensersActions } from '../types'
import { RootState } from 'data/store'
import { TLinkDecrypted, TDispenser } from 'types'
import {  dispensersApi } from 'data/api'
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!web-workers/qrs-worker'
import { QRsWorker } from 'web-workers/qrs-worker'
import { wrap, Remote, proxy } from 'comlink'
import { sleep, alertError, defineIfLinksHasEqualContents } from 'helpers'
import { plausibleApi } from 'data/api'
import axios from 'axios'

const addLinksToQR = ({
  dispenserId,
  encryptedMultiscanQREncCode,
  links,
  linksCount,
  callback
}: {
  dispenserId: string,
  encryptedMultiscanQREncCode: string,
  links: TLinkDecrypted[],
  linksCount: number,
  callback?: () => void,
}) => {
  return async (
    dispatch: Dispatch<DispensersActions>,
    getState: () => RootState
  ) => {
    const { user: { dashboardKey, address } } = getState()
    try {
      let currentPercentage = 0
      if (!dashboardKey) {
        throw new Error('dashboardKey is not provided')
      }
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
        dashboardKey
      )
      const apiMethod = linksCount > 0 ? dispensersApi.updateLinks : dispensersApi.mapLinks
      const linksHasEqualContents = defineIfLinksHasEqualContents(links)
      const result = await apiMethod(dispenserId, qrArrayMapped, linksHasEqualContents)
      
      if (result.data.success) {
        plausibleApi.invokeEvent({
          eventName: 'multiqr_connect',
          data: {
            success: 'yes',
            address,
            dispenserId
          }
        })
        const result: { data: { dispensers: TDispenser[] } } = await dispensersApi.get()
        dispatch(actionsDispenser.setDispensers(result.data.dispensers))
        callback && callback()
      }
      
      if (!result.data.success) {
        plausibleApi.invokeEvent({
          eventName: 'multiqr_connect',
          data: {
            success: 'no',
            address,
            dispenserId
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
          dispenserId
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

export default addLinksToQR