import { TTokenType } from './index.js'

export type TNFTToken = {
  title: string
  tokenType: TTokenType
  tokenId: string
  balance: string
  media: {
    bytes?: number
    gateway: string
  }[]
}
