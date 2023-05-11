import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import { TDispenser } from 'types'

export interface DispensersState {
  dispensers: TDispenser[],
  loading: boolean
  mappingLoader: number
}

export type DispensersActions = ActionType<typeof actions>