import TClaimPattern from "./claim-pattern"
import TTokenType from "./token-type"

export type TCollectionToken = {
  name: string
  description?: string
  copies: string
  properties: Record<string, string>
  token_id: string
  thumbnail?: string
}

export type TCollection = {
  title: string
  collection_id?: string
  created_at?: string
  updated_at?: string
  symbol: string
  thumbnail?: string
  sbt: boolean
  token_standard: TTokenType
  token_address?: string
  tokens?: TCollectionToken[]
  tokens_amount: string
  claim_pattern: TClaimPattern
  chain_id: String
}

