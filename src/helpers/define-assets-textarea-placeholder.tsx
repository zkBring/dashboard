import { TTokenType } from 'types'
import { NATIVE_TOKEN_ADDRESS } from 'configs/app'

type TDefinePlaceholder = (
  type: TTokenType,
  valid: boolean,
  tokenAddress: string,
  nativeTokenSymbol: string
) => string

const defineAssetsTextareaPlaceholder: TDefinePlaceholder = (
  type,
  valid,
  tokenAddress,
  nativeTokenSymbol
) => {
  if (!valid) {
    if (type.toUpperCase() === 'ERC20') {
      if (tokenAddress === NATIVE_TOKEN_ADDRESS) {
        return `Provide a valid native token address`
      }
      return `Provide a valid ERC-20 token address`
    }

    if (type.toUpperCase() === 'ERC721') {
      return `Provide a valid ERC-721 token address`
    }

    if (type.toUpperCase() === 'ERC1155') {
      return `Provide a valid ERC-1155 token address`
    }
  }
  if (type.toUpperCase() === 'ERC20') {
    if (tokenAddress === NATIVE_TOKEN_ADDRESS) {
      return `Be careful and paste info in the following order:
Tokens amount, native token amount (if needed). In brackets you can provide an amount of links
Example:
0.1 - one link with 0.1 ${nativeTokenSymbol}
0.1(20) - 20 links with 0.1 ${nativeTokenSymbol} in each
`
    }
    return `Be careful and paste info in the following order:
Token amount, native token amount (if needed). In brackets you can provide an amount of links
Example:
0.1 - one link with 0.0001 of token amount
0.1, 0.2 - one link with 0.1 of token amount and 0.2 ${nativeTokenSymbol}
0.1(2) - 2 links with 0.1 of token amount in each
0.1, 0.2(2) - 2 links with 0.1 of token amount and 0.2 ${nativeTokenSymbol} in each
`
  }
  if (type.toUpperCase() === 'ERC721') {
    return `Be careful and paste info in the following order:
Token ID, native token amount (if needed). In brackets you can specify an interval of token IDs
Example:
1 - one link with one nft-token (id: 1)
[1-10] - 10 links with one nft-token in each (IDs from 1 to 10)
1, 0.1 - 1 links with one nft-token (id: 1) and 0.1 ${nativeTokenSymbol}
`
  }

  if (type.toUpperCase() === 'ERC1155') {
    return `Be careful and paste info in the following order:
Token ID, token amount and native token amount (if needed). In brackets you can specify an amount of links
Example:
1, 1 - one link with one nft-token (id: 1)
1, 1(2) - 2 links with one nft-token (id: 1) in each link
1, 1, 0.1 - one link with one nft-token (id: 1) and 0.1 ${nativeTokenSymbol}
1, 1, 0.1(2) - 2 links with one nft-token (id: 1) and 0.1 ${nativeTokenSymbol} in each link 
`
  }
  return ''
}

export default defineAssetsTextareaPlaceholder
