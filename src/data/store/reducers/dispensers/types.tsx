import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import { TDispenser, TCampaign } from 'types'

export interface DispensersState {
  dispensers: TDispenser[]
  loading: boolean
  mappingLoader: number
  currentDispenserData: { campaign: TCampaign | null }
}

export type DispensersActions = ActionType<typeof actions>