import TClaimPattern from "./claim-pattern"
import TTokenType from "./token-type"

export type TCollectionToken = {
  name: string
  description?: string
  copies: number
}

export type TCollection = {
  title: string
  collection_id: string
  created_at?: string
  updated_at?: string
  symbol: string
  thumbnail: string
  sbt: boolean
  token_type: TTokenType
  address?: string
  tokens?: TCollectionToken[]
  tokens_amount: number
  claim_pattern: TClaimPattern
  chain_id: number
}

