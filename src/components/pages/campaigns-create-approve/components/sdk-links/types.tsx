import { TTokenType, TCampaign, TClaimPattern } from 'types'
import { TLinksContent } from '../../types'

export type TProps = {
  type: TTokenType
  campaign?: TCampaign | null
  assetsData: TLinksContent
  sdk: boolean
  claimPattern: TClaimPattern
  setAssetsData: (newAssets: TLinksContent) => void
}
