import { TOwnedTokens, TAlchemyToken, TOwnedToken } from 'types'

type TConvertAlchemyTokens = (tokens: TAlchemyToken[]) => TOwnedTokens

const convertAlchemyTokens: TConvertAlchemyTokens = (tokens) => {
  const result = tokens.reduce<TOwnedTokens>((sum, item) => {
    if (!sum[item.contract.address]) {
      return {...sum, [item.contract.address]: {
        name: item.contract.name,
        symbol: item.contract.symbol,
        address: item.contract.address,
        tokenType: item.tokenType,
        tokens: [{
          id: item.tokenId,
          amount: item.balance
        }]
      }}
    }
    return {...sum, [item.contract.address]: {
      ...sum[item.contract.address],
      tokens: [
        ...sum[item.contract.address].tokens,
        {
          id: item.tokenId,
          amount: item.balance
        }
      ]
    }}
  }, {})
  
  return result
}

export default convertAlchemyTokens