import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import { QRsActions } from '../types'
import { RootState } from 'data/store'
import { downloadBase64FilesAsZip, sleep } from 'helpers'
import { TQRItem } from "types"
import QRCodeStyling from 'qr-code-styling'
import { decrypt } from 'lib/crypto'
import { CLAIM_APP_QR } from 'configs/app'
import LedgerLogo from 'images/ledger.png'

const downloadQRs = ({
  qrsArray,
  qrSetName,
  callback
}: {
  qrsArray: TQRItem[],
  qrSetName: string,
  callback?: () => void
}) => {
  return async (
    dispatch: Dispatch<QRsActions>,
    getState: () => RootState
  ) => {
    dispatch(actionsQR.setLoading(true))
    dispatch(actionsQR.setDownloadItems([]))
    const { user: { dashboardKey }, qrs: { downloadItems } } = getState()
    try {
      if (!dashboardKey) { return alert('dashboardKey is not provided') }
      if (!qrsArray) { return alert('qrsArray is not provided') }
      let qrs: Blob[] = []
      for (let i = 0; i < qrsArray.length; i++) {
        const decrypted_qr_secret = decrypt(qrsArray[i].encrypted_qr_secret, dashboardKey)
        const currentQr = new QRCodeStyling({
          data: `${CLAIM_APP_QR}/#/qr/${decrypted_qr_secret}`,
          width: 200,
          height: 200,
          margin: 5,
          cornersSquareOptions: {
            type: 'extra-rounded'
          },
          image: LedgerLogo,
          imageOptions: {
            margin: 5,
            imageSize: 0.6,
            crossOrigin: 'anonymous'
          }
        })
        const blob = await currentQr.getRawData('png')
        if (!blob) { continue }

        qrs = [...qrs, blob]
        dispatch(actionsQR.setDownloadItems(qrs))
        await sleep(1)
      }

      downloadBase64FilesAsZip('png', qrs, qrSetName)
      dispatch(actionsQR.setDownloadItems([]))
      callback && callback()
    } catch (err) {
      console.error(err)
    }
    dispatch(actionsQR.setLoading(false))
  }
}

export default downloadQRs