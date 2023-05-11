import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import {  DispensersActions } from '../types'
import { RootState } from 'data/store'
import { downloadBase64FilesAsZip } from 'helpers'
import { TQRItem } from "types"
import {
  sleep,
  loadImage,
  createDataGroups,
  createWorkers,
  terminateWorkers,
  alertError,
  defineQROptions,
  defineIfQRIsDeeplink
} from 'helpers'
import { Remote } from 'comlink';
import { QRsWorker } from 'web-workers/qrs-worker'
import { plausibleApi } from 'data/api'
const {
  REACT_APP_CLAIM_APP
} = process.env

const downloadQR = ({
  multiscan_qr_id,
  encrypted_multiscan_qr_secret,
  encrypted_multiscan_qr_enc_code,
  qrDispenserName,
  width,
  height,
  callback
}: {
  multiscan_qr_id: string,
  encrypted_multiscan_qr_secret: string,
  encrypted_multiscan_qr_enc_code: string,
  qrDispenserName: string,
  width: number,
  height: number,
  callback?: () => void
}) => {
  return async (
    dispatch: Dispatch<DispensersActions>,
    getState: () => RootState
  ) => {
    dispatch(actionsQR.setLoading(true))
    const { user: { dashboardKey, workersCount, address } } = getState()
    try {
      if (!dashboardKey) { return alertError('dashboardKey is not provided') }
      if (!encrypted_multiscan_qr_secret) { return alertError('encrypted_qr_secret is not provided') }
      if (!multiscan_qr_id) { return alertError('qr_id is not provided') }
      const qrOption = defineQROptions(address)
      const resp = await fetch(qrOption.icon)
      const blob = await resp.blob()
      const img = await createImageBitmap(blob as ImageBitmapSource)
      const logoImageLoaded = await loadImage(
        qrOption.imageOptions,
        qrOption.icon
      )

      const linkGroups = createDataGroups([{}], 1)
      const workers = await createWorkers(linkGroups, 'qrs', async (value) => { console.log('qr created') })
      const isDeeplink = defineIfQRIsDeeplink(address)
      const result = await Promise.all(workers.map(({
        worker
      }) => {
        console.log('here')
        return (worker as Remote<QRsWorker>).downloadMultiQR(
          encrypted_multiscan_qr_secret,
          encrypted_multiscan_qr_enc_code,
          width, // qr width
          height, // qr height
          dashboardKey,
          logoImageLoaded.width,
          logoImageLoaded.height,
          img, // image bitmap to render in canvas
          qrOption,
          isDeeplink,
          REACT_APP_CLAIM_APP
        )}
      ))


      for (let y = 0; y < result.length; y++) {
        console.log(`started download of ${y + 1} part of result`)
        await downloadBase64FilesAsZip('png', result[y], `${qrDispenserName}-${y + 1}`, y * result[0].length)
        console.log(`finished download of ${y + 1} part of result`)
      }
  
      terminateWorkers(workers)
      plausibleApi.invokeEvent({
        eventName: 'qr_download',
        data: {
          format: 'png'
        }
      })
      callback && callback()
    } catch (err) {
      callback && callback()
      alertError('check console for more information')
      console.error(err)
    }
    dispatch(actionsQR.setLoading(false))
  }
}

export default downloadQR