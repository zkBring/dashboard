import { TTokenType } from './index.js'

export type TAlchemyNFTToken = {
  title: string
  tokenType: TTokenType
  tokenId: string
  balance: number
  media: {
    bytes: number
    gateway: string
  }[]
}
