import TTokenType from "./token-type"

type TAlchemyERC20Contract = {
  address: string
  totalBalance: string | null
  tokenType: TTokenType
  symbol: string
}

export default TAlchemyERC20Contract
