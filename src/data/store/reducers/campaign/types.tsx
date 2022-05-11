import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { TTokenType, TAssetsData, TLink } from 'types'

export interface CampaignState {
  title?: string | null,
  logoURL?: string | null,
  description?: string | null,

  tokenAddress: string | null,
  campaignAddress?: string | null,
  type: TTokenType | null,
  assets: TAssetsData | null,

  loading: boolean,
  
  decimals: number | null,
  symbol: string | null,
  wallet: string | null,

  proxyContractAddress: string | null,
  approved: boolean,
  id: null | string,
  secured: boolean,
  privateKey: string | null,
  sponsored: boolean,
  links: TLink[]
}

export type CampaignActions = ActionType<typeof actions>;
