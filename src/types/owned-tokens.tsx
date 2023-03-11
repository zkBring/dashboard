import { TTokenType } from './index.js'

export type TOwnedToken = {
  name: string
  symbol: string
  tokenType: TTokenType
  address: string
  tokens: {
    id: string
    amount: number
  }[]
}

export type TOwnedTokens = Record<string, TOwnedToken>
