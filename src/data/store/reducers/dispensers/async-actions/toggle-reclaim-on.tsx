import { Dispatch } from 'redux'
import * as actionsDispensers from '../actions'
import { DispensersActions } from '../types'
import { RootState } from 'data/store'
import { dispensersApi } from 'data/api'
import { alertError } from 'helpers'
import { plausibleApi } from 'data/api'

type TToggleReclaimOnArgs = {
  dispenser_id: string
  reclaim_on: boolean
  successCallback: () => void
  errorCallback: () => void
}

const toggleReclaimOn = ({
  dispenser_id,
  reclaim_on,
  successCallback,
  errorCallback
}: TToggleReclaimOnArgs) => {
  return async (
    dispatch: Dispatch<DispensersActions>,
    getState: () => RootState
  ) => {
    const { user: { address }, dispensers: { dispensers } } = getState()
    dispatch(actionsDispensers.setLoading(true))
    try {
      const { data } : { data: { success: boolean } } = await dispensersApi.updateReclaimOn(dispenser_id, reclaim_on)
      if (data.success) {
        const dispensersUpdated = dispensers.map(item => {
          if (item.dispenser_id === dispenser_id) { 
            return { ...item, reclaim_on }
          }
          return item
        })
        plausibleApi.invokeEvent({
          eventName: 'multiqr_update_reclaim_on',
          data: {
            success: 'yes',
            address,
            newRedirectOnValue: String(reclaim_on),
            dispenserId: dispenser_id
          }
        })
        dispatch(actionsDispensers.setDispensers(dispensersUpdated))
        dispatch(actionsDispensers.setLoading(false))
        if (successCallback) { successCallback() }
      } else {
        plausibleApi.invokeEvent({
          eventName: 'multiqr_update_reclaim_on',
          data: {
            success: 'no',
            address,
            newRedirectOnValue: String(reclaim_on),
            dispenserId: dispenser_id
          }
        })
        if (errorCallback) { errorCallback() }
        return alertError('Dispenser was not updated. Check console for more information')
      }
      
    } catch (err) {
      plausibleApi.invokeEvent({
        eventName: 'multiqr_update_reclaim_on',
        data: {
          success: 'no',
          address,
          newRedirectOnValue: String(reclaim_on),
          dispenserId: dispenser_id
        }
      })
      if (errorCallback) { errorCallback() }
      alertError('Dispenser was not updated. Check console for more information')
      console.error(err)
    }
    dispatch(actionsDispensers.setLoading(false))
  }
}

export default toggleReclaimOn