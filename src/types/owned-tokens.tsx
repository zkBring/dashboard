import { TTokenType, TAlchemyTokenMedia } from './index.js'

export type TOwnedToken = {
  name: string
  symbol: string
  tokenType: TTokenType
  address: string
  
  tokens: {
    id: string
    amount: number
    media: TAlchemyTokenMedia
    name: string
  }[]
}

export type TOwnedTokens = Record<string, TOwnedToken>
