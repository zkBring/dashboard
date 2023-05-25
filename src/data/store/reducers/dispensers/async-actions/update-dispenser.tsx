import { Dispatch } from 'redux'
import * as actionsDispensers from '../actions'
import { DispensersActions } from '../types'
import { RootState } from 'data/store'
import { dispensersApi } from 'data/api'
import { alertError } from 'helpers'
import { TDispenser, TDispenserUpdateData } from 'types'
import { encrypt } from 'lib/crypto'

type TUpdateDispenserArgs = {
  title: string,
  dispenser_id: string,
  date: string,
  duration: number,
  callback?: (id: string) => void,
}

const updateDispenser = ({
  dispenser_id,
  title,
  date,
  duration,
  callback
}: TUpdateDispenserArgs) => {
  return async (
    dispatch: Dispatch<DispensersActions>,
    getState: () => RootState
  ) => {
    const { user: { dashboardKey }, dispensers: { dispensers } } = getState()
    dispatch(actionsDispensers.setLoading(true))
    if (!dashboardKey) {
      throw new Error('dashboardKey is not provided')
    }
    try {
      
      const updatedDispenser: TDispenserUpdateData = {
        claim_duration: duration,
        claim_start: +(new Date(date)),
        title,
        dispenser_id
      }

      const { data } : { data: { dispenser: TDispenser, success: boolean } } = await dispensersApi.updateDispenserData(updatedDispenser)
      if (data.success) {
        const dispensersUpdated = dispensers.map(item => {
          if (item.dispenser_id === dispenser_id) {
            return { ...item, ...data.dispenser }
          }
          return item
        })
        console.log({ dispensersUpdated })
        dispatch(actionsDispensers.setDispensers(dispensersUpdated))
        if (callback) { callback(data.dispenser.dispenser_id as string) }
      } else {
        return alertError('Dispenser was not updated. Check console for more information')
      }
      
    } catch (err) {
      alertError('Couldn’t update Dispanser, please check console')
      console.error(err)
    }
    dispatch(actionsDispensers.setLoading(false))
  }
}

export default updateDispenser