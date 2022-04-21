import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { TTokenType } from 'types'

export interface CampaignState {
  title?: string | null,
  logoURL?: string | null,
  description?: string | null,

  tokenAddress: string | null,
  campaignAddress?: string | null,
  type: TTokenType | null,
  assets: null,

  loading: boolean,
  
  decimals: number | null
}

export type CampaignActions = ActionType<typeof actions>;