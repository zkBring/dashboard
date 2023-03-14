import { TTokenType, TAlchemyTokenMedia } from './index.js'

export type TSingleToken = {
  id: string
  amount: number
  media: TAlchemyTokenMedia
  name: string
}

export type TOwnedToken = {
  name: string
  symbol: string
  tokenType: TTokenType
  address: string
  
  tokens: TSingleToken[]
}

export type TOwnedTokens = Record<string, TOwnedToken>
