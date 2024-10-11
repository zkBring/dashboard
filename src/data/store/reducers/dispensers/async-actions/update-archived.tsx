import { Dispatch } from 'redux'
import * as actionsDispensers from '../actions'
import * as actionsQRManager from '../../qr-manager/actions'

import { DispensersActions } from '../types'
import { QRManagerActions } from '../../qr-manager/types'

import { RootState } from 'data/store'
import { dispensersApi } from 'data/api'

const archiveDispenser = (
  dispenser_id: string | number,
  archived: boolean
) => {
  return async (
    dispatch: Dispatch<DispensersActions> & Dispatch<QRManagerActions>,
    getState: () => RootState
  ) => {
    dispatch(actionsDispensers.setLoading(true))
    const {
      dispensers: {
        dispensers
      },
      qrManager: {
        items
      }
    } = getState()
    
    try {
      const result = await dispensersApi.updateDispenserData({
        dispenser_id: dispenser_id as string,
        archived
      })

      if (result.data.success) {
        const updatedDispensers = dispensers.map(dispenser => {
          if (dispenser.dispenser_id === dispenser_id) {
            return {
              ...dispenser,
              archived
            }
          }
          return dispenser
        })
        dispatch(actionsDispensers.setDispensers(updatedDispensers))

        const updatedQRManagerItems = items.map(item => {
          if (item.item_id === dispenser_id) {
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
    dispatch(actionsDispensers.setLoading(false))
  }
}

export default archiveDispenser