import { TTokenType, TCampaign } from 'types'
import { TLinksContent } from '../../types'

export type TProps = {
  type: TTokenType,
  campaign?: TCampaign | null,
  assetsData: TLinksContent,
  setAssetsData: (newAssets: TLinksContent) => void
}
