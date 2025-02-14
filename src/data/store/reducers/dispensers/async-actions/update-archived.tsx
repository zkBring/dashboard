import { Dispatch } from 'redux'
import * as actionsDispensers from '../actions'

import { DispensersActions } from '../types'

import { RootState } from 'data/store'
import { dispensersApi } from 'data/api'

const archiveDispenser = (
  dispenser_id: string | number,
  archived: boolean
) => {
  return async (
    dispatch: Dispatch<DispensersActions>,
    getState: () => RootState
  ) => {
    dispatch(actionsDispensers.setLoading(true))
    const {
      dispensers: {
        dispensers
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

      }
    } catch (err) {
      console.error(err)
    }
    dispatch(actionsDispensers.setLoading(false))
  }
}

export default archiveDispenser