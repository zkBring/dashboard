import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import { QRsActions } from '../types'
import { RootState } from 'data/store'
import { downloadBase64FilesAsZip } from 'helpers'
import { TQRItem } from "types"
import {
  sleep,
  loadImage,
  createDataGroups,
  createWorkers,
  terminateWorkers
} from 'helpers'
import { Remote } from 'comlink';
import { QRsWorker } from 'web-workers/qrs-worker'
import qrOptions from 'configs/qr-options'

const {
  REACT_APP_CLAIM_APP,
  REACT_APP_QR_OPTIONS
} = process.env

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
    const { user: { dashboardKey, workersCount } } = getState()
    let currentPercentage = 0
    try {
      const neededWorkersCount = qrsArray.length <= 1000 ? 1 : workersCount
      if (!dashboardKey) { return alert('dashboardKey is not provided') }
      if (!qrsArray) { return alert('qrsArray is not provided') }
      const start = +(new Date())
      
      const updateProgressbar = async (value: number) => {
        if (value === currentPercentage || value < currentPercentage) { return }
        currentPercentage = value
        dispatch(actionsQR.setDownloadLoader(currentPercentage))
        await sleep(1)
      }

      const qrOption = qrOptions[REACT_APP_QR_OPTIONS || 'ledger']

      const resp = await fetch(qrOption.icon)
      const blob = await resp.blob()
      const img = await createImageBitmap(blob as ImageBitmapSource)


      const logoImageLoaded = await loadImage(
        qrOption.imageOptions,
        qrOption.icon
      )

      const linkGroups = createDataGroups(qrsArray, neededWorkersCount)
      console.log({ linkGroups })
      const workers = await createWorkers(linkGroups, 'qrs', updateProgressbar)
      console.log({ workers })
      const result = await Promise.all(workers.map(({
        worker,
        data
      }) => (worker as Remote<QRsWorker>).downloadQRs(
        data,
        width, // qr width
        height, // qr height
        dashboardKey,
        logoImageLoaded.width,
        logoImageLoaded.height,
        img, // image bitmap to render in canvas
        qrOption,
        REACT_APP_CLAIM_APP
      )))

      console.log((+ new Date()) - start)

      for (let y = 0; y < result.length; y++) {
        console.log(`started download of ${y + 1} part of result`)
        await downloadBase64FilesAsZip('png', result[y], `${qrSetName}-${y + 1}`, y * result[0].length)
        console.log(`finished download of ${y + 1} part of result`)
      }
  
      currentPercentage = 0
      terminateWorkers(workers)
      dispatch(actionsQR.setDownloadLoader(0))
      callback && callback()
    } catch (err) {
      currentPercentage = 0
      dispatch(actionsQR.setDownloadLoader(0))
      callback && callback()
      alert('Some error occured, check console for more information')
      console.error(err)
    }
    dispatch(actionsQR.setLoading(false))
  }
}

export default downloadQRs