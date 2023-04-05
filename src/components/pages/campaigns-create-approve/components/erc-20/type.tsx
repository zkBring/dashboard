import { TTokenType, TCampaign, TClaimPattern, TAssetsData } from 'types'
import { TLinksContent } from '../../types'

export type TProps = {
  type: TTokenType
  campaign?: TCampaign | null
  assetsData: TLinksContent
  setAssetsData: (newAssets: TLinksContent) => void
  sdk: boolean
  claimPattern: TClaimPattern
}
