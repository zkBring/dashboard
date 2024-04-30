export type TZerionERC20ItemAttributes = {
  quantity: {
    decimals: number
    float: number
    numeric: string
    int: string
  },
  value: number
  price: number,
  fungible_info: {
    name: string
    symbol: string
    implementations: {
      address: string
      chain_id: string
    }[]
    icon: {
      url: string
    }
  }
}

export type TZerionERC20ItemRelationships = {
  chain: {
    data: {
      id: string
    }
  }
}

export type TZerionERC20Item = {
  id: string
  attributes: TZerionERC20ItemAttributes
  relationships: TZerionERC20ItemRelationships
}
