import { TTokenType, TClaimPattern, TCampaignCreateStep } from 'types'

export type TProps = {
  updatedAt?: number
  createdAt: number
  id: string | null
  chainId: number
  type: TTokenType | null
  proxyContractAddress: string | null
  title?: string | null
  claimPattern?: TClaimPattern
  sponsored?: boolean
  stepToOpen: TCampaignCreateStep
  tokenAddress: string | null
}