import { TTokenType, TCampaign, TLinkContent, TClaimPattern } from 'types'

export type TLinksContent = TLinkContent[]

export type TDefineComponent = (
  type: TTokenType,
  assetsData: TLinksContent,
  setAssetsData: any,
  claimPattern: TClaimPattern,
  campaign?: TCampaign | null
) => React.ReactNode
