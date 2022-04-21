import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { TCampaign } from 'types'

export interface CampaignsState {
  campaigns: TCampaign[]
}

export type CampaignsActions = ActionType<typeof actions>;