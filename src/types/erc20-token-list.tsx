export type TERC20TokenItem = {
  symbol: string
  decimals: number
  address: string
}

export type TERC20TokenList = Record<
  string, TERC20TokenItem
>
