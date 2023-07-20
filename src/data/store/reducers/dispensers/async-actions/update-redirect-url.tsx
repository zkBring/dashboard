import { Dispatch } from 'redux'
import * as actionsDispensers from '../actions'
import { DispensersActions } from '../types'
import { RootState } from 'data/store'
import { dispensersApi } from 'data/api'
import { alertError } from 'helpers'
import { plausibleApi } from 'data/api'

type TUpdateRedirectURLArgs = {
  dispenser_id: string
  redirect_url: string
  successCallback: () => void
  errorCallback: () => void
}

const updateRedirectURL = ({
  dispenser_id,
  redirect_url,
  successCallback,
  errorCallback
}: TUpdateRedirectURLArgs) => {
  return async (
    dispatch: Dispatch<DispensersActions>,
    getState: () => RootState
  ) => {
    const { user: { address }, dispensers: { dispensers } } = getState()
    dispatch(actionsDispensers.setLoading(true))
    try {
      const { data } : { data: { success: boolean } } = await dispensersApi.updateRedirectUrl({ dispenser_id, redirect_url })
      if (data.success) {
        const dispensersUpdated = dispensers.map(item => {
          if (item.dispenser_id === dispenser_id) { 
            return { ...item, redirect_url }
          }
          return item
        })
        plausibleApi.invokeEvent({
          eventName: 'multiqr_update_redirect_url',
          data: {
            success: 'yes',
            address,
            newRedirectURLValue: redirect_url,
            dispenserId: dispenser_id
          }
        })
        dispatch(actionsDispensers.setDispensers(dispensersUpdated))
        if (successCallback) { successCallback() }
      } else {
        plausibleApi.invokeEvent({
          eventName: 'multiqr_update_redirect_url',
          data: {
            success: 'no',
            address,
            newRedirectURLValue: redirect_url,
            dispenserId: dispenser_id
          }
        })
        if (errorCallback) { errorCallback() }
        return alertError('Dispenser was not updated. Check console for more information')
      }
      
    } catch (err) {
      plausibleApi.invokeEvent({
        eventName: 'multiqr_update_redirect_url',
        data: {
          success: 'no',
          address,
          newRedirectURLValue: redirect_url,
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

export default updateRedirectURL