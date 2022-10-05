import { TTokenType, TCampaign, TLinkContent } from 'types'

export type TLinksContent = TLinkContent[]

export type TDefineComponent = (
  type: TTokenType,
  assetsData: TLinksContent,
  setAssetsData: any,
  campaign?: TCampaign | null,
) => React.ReactNode
