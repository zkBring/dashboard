import { TAssetsData, TClaimPattern, TTokenType } from "types"
import { TLinksContent } from '../../types'
import { MathType } from 'mathjs'

export type TAsideContentsProps = {
  approved: boolean | null
  sdk: boolean
  campaignTitle?: string | null
  tokenAddress: string | null
  campaignSymbol: string | null
  campaignTokenStandard: TTokenType | null
  campaignChainId: null | number
  assetsParsed: TAssetsData
  claimPattern: TClaimPattern
  data: TLinksContent
  sponsored: boolean
  totalComission: MathType
}
