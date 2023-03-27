import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import { QRsActions } from '../types'
import { RootState } from 'data/store'
import { TQRStatus } from 'types'
import { qrsApi } from 'data/api'
import { plausibleApi } from 'data/api'

const updateQRSetStatus = ({
  setId,
  newStatus,
  callback
}: {
  setId: string | number,
  newStatus: TQRStatus,
  callback?: () => void,
}) => {
  return async (
    dispatch: Dispatch<QRsActions>,
    getState: () => RootState
  ) => {
    const { qrs: { qrs } } = getState()
    try {
      dispatch(actionsQR.setLoading(true))
      const result = await qrsApi.updateStatus(setId, newStatus)
      if (result.data.success) {
        await plausibleApi.invokeEvent({
          eventName: 'qr_upd_status'
        })
        const qrsUpdated = qrs.map(item => {
          if (item.set_id === setId) {
            return {
              ...item,
              status: newStatus
            }
          }
          return item
        })
        dispatch(actionsQR.updateQrs(qrsUpdated))
        callback && callback()
      }
    } catch (err) {
      console.error(err)
    }
    dispatch(actionsQR.setLoading(false))
  }
}


export default updateQRSetStatus