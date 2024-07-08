import { Dispatch } from 'redux'
import * as actionsDispensers from '../actions'
import { DispensersActions } from '../types'
import { RootState } from 'data/store'
import { dispensersApi } from 'data/api'
import { alertError } from 'helpers'
import { TDispenserWhitelistType } from 'types'

type TCreateWhitelistArgs = {
  dispenser_id: string
  whitelist: string[]
  whitelist_type: TDispenserWhitelistType
  successCallback?: () => void
  errorCallback?: () => void
}

const createWhitelist = ({
  dispenser_id,
  whitelist,
  whitelist_type,
  successCallback,
  errorCallback
}: TCreateWhitelistArgs) => {
  return async (
    dispatch: Dispatch<DispensersActions>,
    getState: () => RootState
  ) => {
    const { dispensers: { dispensers } } = getState()
    dispatch(actionsDispensers.setLoading(true))
    try {
      const { data } : { data: { success: boolean } } = await dispensersApi.createWhitelist(
        dispenser_id,
        true,
        whitelist_type,
        whitelist
      )
      if (data.success) {
        const dispensersUpdated = dispensers.map(item => {
          if (item.dispenser_id === dispenser_id) { 
            return {
              ...item,
              whitelist_on: true,
              whitelist_type: whitelist_type,
              whitelist_count: whitelist.length
            }
          }
          return item
        })
        
        dispatch(actionsDispensers.setDispensers(dispensersUpdated))
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

export default createWhitelist