import { Dispatch } from 'redux'
import * as actionsQRs from '../actions'
import { QRsActions } from '../types'
import { RootState } from 'data/store'
import { qrsApi } from 'data/api'
import { QRManagerActions } from '../../qr-manager/types'
import * as actionsQRManager from '../../qr-manager/actions'

const updateArchived = (
  set_id: string | number,
  archived: boolean
) => {
  return async (
    dispatch: Dispatch<QRsActions> & Dispatch<QRManagerActions>,
    getState: () => RootState
  ) => {
    dispatch(actionsQRs.setLoading(true))
    const {
      qrs: {
        qrs
      },
      qrManager: {
        items
      }
    } = getState()
    
    try {
      const result = await qrsApi.update({
        set_id: set_id as string,
        archived
      })

      if (result.data.success) {
        const updatedQRs = qrs.map(qrSet => {
          if (qrSet.set_id === set_id) {
            return {
              ...qrSet,
              archived
            }
          }
          return qrSet
        })
        dispatch(actionsQRs.updateQrs(updatedQRs))

        const updatedQRManagerItems = items.map(item => {
          if (item.item_id === set_id) {
            return {
              ...item,
              archived
            }
          }
          return item
        })
        dispatch(actionsQRManager.setItems(updatedQRManagerItems))
      }
    } catch (err) {
      console.error(err)
    }
    dispatch(actionsQRs.setLoading(false))
  }
}

export default updateArchived