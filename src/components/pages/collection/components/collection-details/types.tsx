import { TTokenType } from "types"

export type TProps = {
  symbol: string
  tokenType: TTokenType
  tokenAddress: string
  image: string
  userAddress: string
  name: string
  chainId: number
}