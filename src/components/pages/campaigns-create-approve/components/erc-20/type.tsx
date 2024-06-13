import { TTokenType, TCampaign, TClaimPattern, TLinkContent } from 'types'
import { TLinksContent } from '../../types'

export type TProps = {
  type: TTokenType
  campaign?: TCampaign | null
  assetsData: TLinksContent
  setAssetsData: (newAssets: TLinksContent) => void
  sdk: boolean
  claimPattern: TClaimPattern
  formData: TLinkContent
  setFormData: (formData: TLinkContent) => void
  getDefaultValues: (tokenType: TTokenType) => TLinkContent
  children?: React.ReactNode
}
