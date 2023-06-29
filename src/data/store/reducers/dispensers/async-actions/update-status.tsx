import { Dispatch } from 'redux'
import * as actionsDispensers from '../actions'
import { DispensersActions } from '../types'
import { RootState } from 'data/store'
import { dispensersApi } from 'data/api'
import { alertError } from 'helpers'
import { plausibleApi } from 'data/api'

type TUpdateStatusArgs = {
  dispenser_id: string
  active: boolean
  callback?: () => void
}

const updateStatus = ({
  dispenser_id,
  active,
  callback
}: TUpdateStatusArgs) => {
  return async (
    dispatch: Dispatch<DispensersActions>,
    getState: () => RootState
  ) => {
    const { user: { address }, dispensers: { dispensers } } = getState()
    dispatch(actionsDispensers.setLoading(true))
    try {

      const { data } : { data: { success: boolean } } = await dispensersApi.updateStatus({ dispenser_id, active })
      if (data.success) {
        const dispensersUpdated = dispensers.map(item => {
          if (item.dispenser_id === dispenser_id) { 
            return { ...item, active }
          }
          return item
        })
        plausibleApi.invokeEvent({
          eventName: 'multiqr_update_status',
          data: {
            success: 'yes',
            address,
            dispenserId: dispenser_id
          }
        })
        dispatch(actionsDispensers.setDispensers(dispensersUpdated))
        if (callback) { callback() }
      } else {
        plausibleApi.invokeEvent({
          eventName: 'multiqr_update_status',
          data: {
            success: 'no',
            address,
            dispenserId: dispenser_id
          }
        })
        return alertError('Dispenser was not updated. Check console for more information')
      }
      
    } catch (err) {
      plausibleApi.invokeEvent({
        eventName: 'multiqr_update_status',
        data: {
          success: 'no',
          address,
          dispenserId: dispenser_id
        }
      })
      alertError('Couldn’t update Dispanser, please check console')
      console.error(err)
    }
    dispatch(actionsDispensers.setLoading(false))
  }
}

export default updateStatus