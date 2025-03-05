import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import {
  TTokenType,
  TLaunchStage,
  TClaimPattern,
  TAssetsData,
  TLink,
  TZKTLSService,
  TProofProvider,
  TTransactionStage
} from 'types'
import { BigNumber } from 'ethers'

export interface CampaignState {
  title?: string | null
  description?: string | null

  tokenAddress: string | null
  campaignAddress?: string | null 
  tokenStandard: TTokenType | null
  assets: TAssetsData | null
  loading: boolean
  decimals: number | null
  symbol: string | null
  wallet: string | null
  proxyContractAddress: string | null
  approved: boolean | null
  id: null | string
  secured: boolean
  signerKey: string | null
  signerAddress: string | null
  sponsored: boolean
  claimPattern: TClaimPattern
  nativeTokensPerLink: BigNumber | null
  linksGenerateLoader: number
  sdk: boolean
  expirationDate: number
  links: {
    date: string,
    links: TLink[],
  }[]
  countriesWhitelist: string[]
  countriesWhitelistOn: boolean
  preferredWalletOn: boolean

  // for own collections
  collectionId?: null | string,
  collectionTokenId?: null | string
  additionalWalletsOn: boolean

  claimHost: string | null
  claimHostOn: boolean
  multipleClaimsOn: boolean

  launchStage: TLaunchStage
  transactionStage: TTransactionStage


  zkTLSService: TZKTLSService
  proofProvider: TProofProvider,
  appId: string
  secret: string
  providerId: string
  handleKey: string
}

export type CampaignActions = ActionType<typeof actions>;
