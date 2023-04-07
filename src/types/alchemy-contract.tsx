import { TTokenType } from './index.js'

type TAlchemyContract = {
  address: string
  name: string
  numDistinctTokensOwned: number
  symbol: string
  title: string
  tokenId: string
  tokenType: TTokenType
  totalBalance: number
}

export default TAlchemyContract
