import { Dispatch } from 'redux'
import * as actionsDispensers from '../actions'
import { DispensersActions } from '../types'
import { RootState } from 'data/store'
import { dispensersApi } from 'data/api'
import { alertError } from 'helpers'
import { TDispenserWhitelistType } from 'types'

type TCreateAddressWhitelistArgs = {
  dispenser_id: string
  addresses: string[]
  successCallback: () => void
  errorCallback: () => void
}

const createAddressWhitelist = ({
  dispenser_id,
  addresses,
  successCallback,
  errorCallback
}: TCreateAddressWhitelistArgs) => {
  return async (
    dispatch: Dispatch<DispensersActions>,
    getState: () => RootState
  ) => {
    const { user: { address }, dispensers: { dispensers } } = getState()
    dispatch(actionsDispensers.setLoading(true))
    try {
      const { data } : { data: { success: boolean } } = await dispensersApi.createWhitelist(
        dispenser_id,
        'address',
        addresses
      )
      if (data.success) {
        const dispensersUpdated = dispensers.map(item => {
          if (item.dispenser_id === dispenser_id) { 
            return {
              ...item,
              whitelist_type: 'address' as TDispenserWhitelistType,
              whitelist_count: addresses.length
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

export default createAddressWhitelist