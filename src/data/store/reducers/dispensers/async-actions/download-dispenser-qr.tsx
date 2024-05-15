import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import {  DispensersActions } from '../types'
import { RootState } from 'data/store'
import { downloadBase64FilesAsZip } from 'helpers'
import {
  loadImage,
  alertError,
  defineQROptions,
  defineDispenserAppUrl,
  defineClaimAppURL
} from 'helpers'
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!web-workers/qrs-worker'
import { QRsWorker } from 'web-workers/qrs-worker'
import { wrap, Remote, proxy } from 'comlink'
import { plausibleApi } from 'data/api'
import { decrypt, encrypt } from 'lib/crypto'

const downloadQR = ({
  multiscan_qr_id,
  encrypted_multiscan_qr_secret,
  encrypted_multiscan_qr_enc_code,
  qrDispenserName,
  width,
  height,
  whitelist_on,
  dynamic,
  callback
}: {
  multiscan_qr_id: string,
  encrypted_multiscan_qr_secret: string,
  encrypted_multiscan_qr_enc_code: string,
  qrDispenserName: string,
  width: number,
  height: number,
  whitelist_on: boolean,
  dynamic: boolean,
  callback?: () => void
}) => {
  return async (
    dispatch: Dispatch<DispensersActions>,
    getState: () => RootState
  ) => {
    dispatch(actionsQR.setLoading(true))
    const { user: { dashboardKey, address } } = getState()
    try {
      if (!dashboardKey) { return alertError('dashboardKey is not provided') }
      if (!encrypted_multiscan_qr_secret) { return alertError('encrypted_multiscan_qr_secret is not provided') }
      if (!multiscan_qr_id) { return alertError('multiscan_qr_id is not provided') }
      const claimAppURL = defineClaimAppURL(address)
      const qrOption = defineQROptions(address)
      const resp = await fetch(qrOption.icon)
      const blob = await resp.blob()
      const img = await createImageBitmap(blob as ImageBitmapSource)
      const logoImageLoaded = await loadImage(
        qrOption.imageOptions,
        qrOption.icon
      )

      const RemoteChannel = wrap<typeof QRsWorker>(new Worker())
      const qrsWorker: Remote<QRsWorker> = await new RemoteChannel(proxy(() => console.log('QR created')))

      const decryptedQrSecret = decrypt(encrypted_multiscan_qr_secret, dashboardKey)
      const decryptedQrEncCode = decrypt(encrypted_multiscan_qr_enc_code, dashboardKey)
      const claimURLDecrypted = defineDispenserAppUrl(
        claimAppURL,
        decryptedQrSecret,
        decryptedQrEncCode,
        whitelist_on,
        dynamic
      )
    
      const result = await qrsWorker.downloadMultiQR(
        claimURLDecrypted,
        width, // qr width
        height, // qr height
        logoImageLoaded.width,
        logoImageLoaded.height,
        img, // image bitmap to render in canvas
        qrOption
      )

      await downloadBase64FilesAsZip('png', result, null, qrDispenserName, 0)
  
      plausibleApi.invokeEvent({
        eventName: 'multiqr_download',
        data: {
          success: 'yes',
          format: 'png',
          address,
        }
      })
      callback && callback()
    } catch (err) {
      plausibleApi.invokeEvent({
        eventName: 'multiqr_download',
        data: {
          success: 'no',
          format: 'png',
          address
        }
      })
      callback && callback()
      alertError('check console for more information')
      console.error(err)
    }
    dispatch(actionsQR.setLoading(false))
  }
}

export default downloadQR