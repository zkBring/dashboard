import { TTokenType, TCampaign, TLinkContent, TClaimPattern, TAssetsData } from 'types'

export type TLinksContent = TLinkContent[]

export type TDefineComponent = (
  type: TTokenType,
  assetsData: TLinksContent,
  setAssetsData: any,
  claimPattern: TClaimPattern,
  setUploadCSVPopup: () => void,
  sponsored: boolean,
  sdk: boolean,
  campaign?: TCampaign | null,
) => React.ReactNode
