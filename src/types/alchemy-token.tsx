import { TTokenType } from './index.js'

type TAlchemyContract = {
  address: string
  name: string
  symbol: string
}

type TAlchemyToken = {
  balance: number
  tokenId: string
  tokenType: TTokenType,
  contract: TAlchemyContract
}

export default TAlchemyToken
