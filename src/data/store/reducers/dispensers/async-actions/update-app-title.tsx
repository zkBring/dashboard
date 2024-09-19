import { Dispatch } from 'redux'
import * as actionsDispensers from '../actions'
import { DispensersActions } from '../types'
import { RootState } from 'data/store'
import { dispensersApi } from 'data/api'
import { alertError } from 'helpers'
import { TDispenserWhitelistType } from 'types'

type TUpdateAppTitleArgs = {
  dispenser_id: string
  app_title: string
  successCallback?: () => void
  errorCallback?: () => void
}

const updateAppTitle = ({
  dispenser_id,
  app_title,
  successCallback,
  errorCallback
}: TUpdateAppTitleArgs) => {
  return async (
    dispatch: Dispatch<DispensersActions>,
    getState: () => RootState
  ) => {
    const { dispensers: { dispensers } } = getState()
    dispatch(actionsDispensers.setLoading(true))
    try {
      const { data } : { data: { success: boolean } } = await  dispensersApi.updateDispenserSettings({
        dispenser_id,
        app_title
      })
      if (data.success) {
        const dispensersUpdated = dispensers.map(item => {
          if (item.dispenser_id === dispenser_id) { 
            return {
              ...item,
              app_title
            }
          }
          return item
        })
        
        dispatch(actionsDispensers.setDispensers(dispensersUpdated))
        dispatch(actionsDispensers.setLoading(false))

        if (successCallback) { successCallback() }
      } else {
        if (errorCallback) { errorCallback() }
        return alertError('Dispenser was not updated. Check console for more information')
      }
      
    } catch (err) {
      if (errorCallback) { errorCallback() }
      alertError('Dispenser was not updated. Check console for more information')
      console.error(err)
    }
    dispatch(actionsDispensers.setLoading(false))
  }
}

export default updateAppTitle