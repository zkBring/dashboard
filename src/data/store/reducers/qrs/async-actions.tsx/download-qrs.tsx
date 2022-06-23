import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import { QRsActions } from '../types'
import { RootState } from 'data/store'
import { TQRItem } from 'types'
import { convertLinksToBase64, downloadBase64FilesAsZip } from 'helpers'


const downloadQRs = ({
  qrsArray
}: {
  qrsArray: TQRItem[],
}) => {
  return async (
    dispatch: Dispatch<QRsActions>,
    getState: () => RootState
  ) => {
    dispatch(actionsQR.setLoading(true))
    const { user: { dashboardKey } } = getState()
    try {
      if (!dashboardKey) { return alert('dashboardKey is not provided') }
      if (!qrsArray) { return alert('qrsArray is not provided') }
      const qrs: Blob[] = await convertLinksToBase64('png', qrsArray, dashboardKey)
      downloadBase64FilesAsZip('png', qrs)
    } catch (err) {
      console.error(err)
    }
    dispatch(actionsQR.setLoading(false))
  }
}

export default downloadQRs