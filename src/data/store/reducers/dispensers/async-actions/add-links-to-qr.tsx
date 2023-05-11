import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import { DispensersActions } from '../types'
import { RootState } from 'data/store'
import { TQRItem, TLinkDecrypted, TDispenser } from 'types'
import {  dispensersApi } from 'data/api'
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!web-workers/qrs-worker'
import { QRsWorker } from 'web-workers/qrs-worker'
import { wrap, Remote, proxy } from 'comlink'
import { sleep, alertError } from 'helpers'
import { plausibleApi } from 'data/api'

const addLinksToQR = ({
  dispenserId,
  encryptedMultiscanQREncCode,
  links,
  callback
}: {
  dispenserId: string,
  encryptedMultiscanQREncCode: string,
  links: TLinkDecrypted[],
  callback?: () => void,
}) => {
  return async (
    dispatch: Dispatch<DispensersActions>,
    getState: () => RootState
  ) => {
    const { qrs: { qrs: qrSets }, user: { dashboardKey } } = getState()
    try {
      let currentPercentage = 0
      if (!dashboardKey) {
        throw new Error('dashboardKey is not provided')
      }
      dispatch(actionsQR.setLoading(true))
      const start = +(new Date())

      const updateProgressbar = async (value: number) => {
        if (value === currentPercentage || value < currentPercentage) { return }
        currentPercentage = value
        dispatch(actionsQR.setMappingLoader(currentPercentage))
        await sleep(1)
      }

      const RemoteChannel = wrap<typeof QRsWorker>(new Worker())
      const qrsWorker: Remote<QRsWorker> = await new RemoteChannel(proxy(updateProgressbar));
  
      const qrArrayMapped = await qrsWorker.prepareLinksForDispenser(
        encryptedMultiscanQREncCode,
        links,
        dashboardKey
      )
      console.log((+ new Date()) - start)
      const result = await dispensersApi.mapLinks(dispenserId, qrArrayMapped)
      
      if (result.data.success) {
        plausibleApi.invokeEvent({
          eventName: 'qr_connect',
          data: {
            success: 'yes'
          }
        })
        const result: { data: { dispensers: TDispenser[] } } = await dispensersApi.get()
        dispatch(actionsQR.setDispensers(result.data.dispensers))
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

export default addLinksToQR