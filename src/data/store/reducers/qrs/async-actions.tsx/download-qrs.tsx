import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import { QRsActions } from '../types'
import { RootState } from 'data/store'
import { downloadBase64FilesAsZip, sleep } from 'helpers'
import { TQRItem } from "types"
import QRCodeStyling from 'qr-code-styling'
import { decrypt } from 'lib/crypto'
import { CLAIM_APP_QR } from 'configs/app'
import LedegerImage from 'images/ledger-logo.svg'

type tplotOptions = {
  [key: string]: any
}

const downloadQRs = ({
  qrsArray,
  qrSetName,
  width,
  height,
  callback
}: {
  qrsArray: TQRItem[],
  qrSetName: string,
  width: number,
  height: number,
  callback?: () => void
}) => {
  return async (
    dispatch: Dispatch<QRsActions>,
    getState: () => RootState
  ) => {
    dispatch(actionsQR.setLoading(true))
    dispatch(actionsQR.setDownloadItems([]))
    const { user: { dashboardKey } } = getState()
    try {
      if (!dashboardKey) { return alert('dashboardKey is not provided') }
      if (!qrsArray) { return alert('qrsArray is not provided') }
      let qrs: Blob[] = []
      for (let i = 0; i < qrsArray.length; i++) {
        const decrypted_qr_secret = decrypt(qrsArray[i].encrypted_qr_secret, dashboardKey)
        const currentQr = new QRCodeStyling({
          data: `${CLAIM_APP_QR}/#/qr/${decrypted_qr_secret}`,
          width,
          height,
          margin: 40,
          type: 'svg',
          cornersSquareOptions: {
            type: 'extra-rounded'
          },
          image: LedegerImage,
          imageOptions: {
            margin: 2,
            imageSize: 0.5,
            crossOrigin: 'anonymous'
          }
        })
        currentQr.applyExtension((svg, options) => {
          const border = document.createElementNS("http://www.w3.org/2000/svg", "rect");
          const { width, height } = options;
          const size = Math.min(width || 0, height || 0);
          console.log({ width, height, size })
          const borderAttributes: tplotOptions = {
            "fill": "none",
            "x": ((width || 0) - size + 40) / 2,
            "y": ((height || 0) - size + 40) / 2,
            "width": size - 40,
            "height": size - 40,
            "stroke": 'black',
            "stroke-width": 40,
            "rx": 40
          }
          const textAttributes: tplotOptions = {
            "fill": "none",
            "x": ((width || 0) - size + 40) / 2,
            "y": ((height || 0) - size + 40) / 2,
            "width": size - 40,
            "height": size - 40,
            "stroke": 'black',
            "stroke-width": 40,
            "rx": 40
          }
          Object.keys(borderAttributes).forEach(attribute => {
            border.setAttribute(attribute, borderAttributes[attribute]);
          })
          border.textContent = 'Hello world!'
          svg.appendChild(border)
        })

        const blob = await currentQr.getRawData('svg')
        if (!blob) { continue }

        qrs = [...qrs, blob]
        dispatch(actionsQR.setDownloadItems(qrs))
        await sleep(1)
      }

      downloadBase64FilesAsZip('svg', qrs, qrSetName)
      dispatch(actionsQR.setDownloadItems([]))
      callback && callback()
    } catch (err) {
      console.error(err)
    }
    dispatch(actionsQR.setLoading(false))
  }
}

export default downloadQRs