import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { TTokenType, TLinkContent, TClaimPattern, TAssetsData, TLink, TDistributionPattern } from 'types'

export interface CampaignState {
  title?: string | null,
  tokenAddress: string | null,
  campaignAddress?: string | null,
  tokenStandard: TTokenType | null,
  assets: TAssetsData | null,
  assetsOriginal: TLinkContent[] | null,
  loading: boolean,
  decimals: number | null,
  symbol: string | null,
  wallet: string | null,
  proxyContractAddress: string | null,
  approved: boolean,
  id: null | string,
  secured: boolean,
  signerKey: string | null,
  signerAddress: string | null,
  sponsored: boolean,
  claimPattern: TClaimPattern,
  nativeTokensPerLink: string,
  linksGenerateLoader: number,
  distributionPattern: TDistributionPattern,
  links: {
    date: string,
    links: TLink[],
  }[]
}

export type CampaignActions = ActionType<typeof actions>;
