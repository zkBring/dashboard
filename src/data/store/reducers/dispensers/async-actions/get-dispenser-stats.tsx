import { Dispatch } from 'redux'
import * as actionsDispensers from '../actions'
import { DispensersActions } from '../types'
import { RootState } from 'data/store'
import { dispensersApi } from 'data/api'
import { alertError } from 'helpers'
import { TDispenser } from 'types'
import { encrypt } from 'lib/crypto'
import { plausibleApi } from 'data/api'

type TGetDispenserStatsArgs = {
  dispenser_id: string
  callback?: () => void
}

const getDispenserStats = ({
  dispenser_id,
  callback
}: TGetDispenserStatsArgs) => {
  return async (
    dispatch: Dispatch<DispensersActions>,
    getState: () => RootState
  ) => {
    dispatch(actionsDispensers.setLoading(true))
   
    const { dispensers: { dispensers } } = getState()
    try {
      const { data: { success, dispenser} } : { data: { success: boolean, dispenser: TDispenser } }= await dispensersApi.getOne(dispenser_id)
      if (success) {
        const dispensersUpdated = dispensers.map(item => {
          if (item.dispenser_id === dispenser_id) { 
            return { ...item, links_assigned: dispenser.links_assigned }
          }
          return item
        })
        dispatch(actionsDispensers.setDispensers(dispensersUpdated))
        if (callback) { callback() }
      }
      
    } catch (err) {
    
      alertError('Couldn’t fetch Dispanser data, please check console')
      console.error(err)
    }
    dispatch(actionsDispensers.setLoading(false))
  }
}

export default getDispenserStats