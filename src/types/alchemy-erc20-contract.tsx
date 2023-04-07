import TTokenType from "./token-type"

type TAlchemyERC20Contract = {
  address: string
  totalBalance: string | null
  tokenType: TTokenType
  symbol: string
  decimals: number
}

export default TAlchemyERC20Contract
