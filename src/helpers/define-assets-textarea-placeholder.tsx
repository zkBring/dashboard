import { TTokenType } from 'types'
import { NATIVE_TOKEN_ADDRESS } from 'configs/app'

type TDefinePlaceholder = (type: TTokenType, valid: boolean, tokenAddress: string) => string

const defineAssetsTextareaPlaceholder: TDefinePlaceholder = (type, valid, tokenAddress) => {
  if (!valid) {
    if (type === 'erc20') {
      if (tokenAddress === NATIVE_TOKEN_ADDRESS) {
        return `Provide valid native token address`
      }
      return `Provide valid ERC-20 token address`
    }
  }
  if (type === 'erc20') {
    if (tokenAddress === NATIVE_TOKEN_ADDRESS) {
      return `Be careful and paste info in the following order:
Tokens amount, native token amount (if needed). In brackets you can provide an amount of links
Example:
0.0001 - will create one link with 0.0001 ETH
0.0001(20) - will create 20 links with 0.0001 ETH in each
and so on
`
    }
    return `Be careful and paste info in the following order:
Tokens amount, native token amount (if needed). In brackets you can provide an amount of links
Example:
0.0001
0.0001, 1
0.0001(20)
0.0001, 1(20)
and so on
`
  }
  return ''
  
}

export default defineAssetsTextareaPlaceholder
