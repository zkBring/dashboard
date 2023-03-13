import { TTokenType } from './index.js'

export type TAlchemyTokenMedia = {
  gateway: string
  thumbnail: string
  bytes: number
}[]

type TAlchemyContract = {
  address: string
  name: string
  symbol: string
}

type TAlchemyToken = {
  balance: number
  title: string
  tokenId: string
  tokenType: TTokenType
  contract: TAlchemyContract
  media: TAlchemyTokenMedia
}

export default TAlchemyToken
