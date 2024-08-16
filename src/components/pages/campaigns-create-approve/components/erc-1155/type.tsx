import { TTokenType, TCampaign, TClaimPattern, TLinkContent } from 'types'
import { TLinksContent } from '../../types'

export type TProps = {
  type: TTokenType
  campaign?: TCampaign | null
  assetsData: TLinksContent
  sdk: boolean
  formData: TLinkContent
  setFormData: (formData: TLinkContent) => void
  getDefaultValues: (tokenType: TTokenType) => TLinkContent
  setAssetsData: (newAssets: TLinksContent) => void
  claimPattern: TClaimPattern
  children?: React.ReactNode
  collectionId?: null | string
}
