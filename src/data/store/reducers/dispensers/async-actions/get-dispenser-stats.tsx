import { Dispatch } from 'redux'
import * as actionsDispensers from '../actions'
import { DispensersActions } from '../types'
import { RootState } from 'data/store'
import { dispensersApi } from 'data/api'
import { alertError } from 'helpers'
import {
  TDispenser,
  TDispenserWhitelistType,
  TDispenserWhitelistItemAddress,
  TCampaign
} from 'types'

type TGetDispenserStatsArgs = {
  dispenser_id: string
  multiscan_qr_id: string
  callback?: () => void
}

const getDispenserStats = ({
  dispenser_id,
  multiscan_qr_id,
  callback
}: TGetDispenserStatsArgs) => {
  return async (
    dispatch: Dispatch<DispensersActions>,
    getState: () => RootState
  ) => {
    dispatch(actionsDispensers.setLoading(true))
   
    const { dispensers: { dispensers } } = getState()
    try {
      const {
        data: {
          success: statsSuccess,
          dispenser
        }
      } : {
        data: {
          success: boolean,
          dispenser: TDispenser
        }
      } = await dispensersApi.getOne(dispenser_id)
      if (statsSuccess) {
        const dispensersUpdated = dispensers.map(item => {
          if (item.dispenser_id === dispenser_id) {
            const itemUpdated = { ...item, links_assigned: dispenser.links_assigned }
            return itemUpdated
          }
          return item
        })
        dispatch(actionsDispensers.setDispensers(dispensersUpdated))
        if (callback) { callback() }
      }

      const {
        data: {
          success: campaignSuccess,
          campaign
        }
      } : {
        data: {
          success: boolean,
          campaign: TCampaign
        }
      } = await dispensersApi.getCampaignData(multiscan_qr_id)
      if (campaignSuccess) {
        dispatch(actionsDispensers.setCurrentDispenserData({ campaign: campaign }))
      }
      
    } catch (err) {
      alertError('Couldn’t fetch Dispanser data, please check console')
      console.error(err)
    }

    dispatch(actionsDispensers.setLoading(false))
  }
}

export default getDispenserStats