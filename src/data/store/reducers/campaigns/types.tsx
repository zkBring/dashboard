import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { TCampaign, TCampaignDraft } from 'types'

export interface CampaignsState {
  campaigns: TCampaign[]
  drafts: TCampaignDraft[]
  loading: boolean
}

export type CampaignsActions = ActionType<typeof actions>;