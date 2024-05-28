import { TTokenType, TCampaign, TLinkContent, TClaimPattern } from 'types'
import { RefObject } from 'react'

export type TLinksContent = TLinkContent[]

export type TDefineComponent = (
  type: TTokenType,
  assetsData: TLinksContent,
  setAssetsData: any,
  claimPattern: TClaimPattern,
  setUploadCSVPopup: () => void,
  sponsored: boolean,
  sdk: boolean,
  formData: TLinkContent,
  setFormData: (formData: TLinkContent) => void,
  getDefaultValues: (tokenType: TTokenType) => TLinkContent,
  campaign?: TCampaign | null,
) => React.ReactNode
