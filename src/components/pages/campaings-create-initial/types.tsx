import { TTokenType, TCampaign } from 'types'
import { Dispatch } from 'redux'
import { SetStateAction } from 'react'

export type TLinkContent = {
  tokenId?: string,
  tokenAmount: string,
  linksAmount: string,
  id: number
}
export type TLinksContent = TLinkContent[]

export type TDefineComponent = (
  type: TTokenType,
  assetsData: TLinksContent,
  setAssetsData: any,
  campaign?: TCampaign | null,
) => React.ReactNode
