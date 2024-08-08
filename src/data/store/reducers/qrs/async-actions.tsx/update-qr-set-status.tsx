import { Dispatch } from 'redux'
import * as actionsQR from '../actions'
import { QRsActions } from '../types'
import { RootState } from 'data/store'
import { TQRStatus } from 'types'
import { qrsApi } from 'data/api'
import { plausibleApi } from 'data/api'
import * as qrManagerActions from '../../qr-manager/actions'
import { QRManagerActions } from '../../qr-manager/types'

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
    dispatch: Dispatch<QRsActions> & Dispatch<QRManagerActions>,
    getState: () => RootState
  ) => {
    const {
      qrs: {
        qrs
      },
      qrManager: {
        items
      }
    } = getState()
    try {
      dispatch(actionsQR.setLoading(true))
      const result = await qrsApi.updateStatus(setId, newStatus)
      if (result.data.success) {
        plausibleApi.invokeEvent({
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

        const qrManagerItemsUpdated = items.map(item => {
          if (item.item_id === setId) { 
            return {
              ...item,
              status: newStatus
            }
          }
          return item
        })


        dispatch(qrManagerActions.setItems(qrManagerItemsUpdated))
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