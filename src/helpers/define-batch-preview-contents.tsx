import {
  countAssetsTotalAmountERC20,
  countAssetsTotalAmountERC1155,
  countAssetsTotalAmountERC721,
  defineNativeTokenSymbol,
} from 'helpers'
import { TAsset, TTokenType } from 'types'

type TDefineTitle = (
  type: TTokenType,
  assets: TAsset[],
  symbol: string,
  chainId: number
) => string

const defineTitle: TDefineTitle = (
  type,
  assets,
  symbol,
  chainId
) => {
  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })
  
  if (type === 'erc20') {
    const totalAmount = countAssetsTotalAmountERC20(assets)
    if (symbol === nativeTokenSymbol) {
      // раздача native tokens
      return `${totalAmount.original_native_tokens_amount} ${nativeTokenSymbol}`
    }
    if (String(totalAmount.original_amount) !== '0') {
      // раздача erc-20 tokens
      if (String(totalAmount.original_native_tokens_amount) !== '0') {
        // раздача erc-20 tokens + native tokens
        return `${totalAmount.original_amount} ${symbol} + ${totalAmount.original_native_tokens_amount} ${nativeTokenSymbol}`
      }
      return `${totalAmount.original_amount} ${symbol}`
    }
  }
  if (type === 'erc721') {
    const totalAmount = countAssetsTotalAmountERC721(assets)
    if (String(totalAmount.original_native_tokens_amount) !== '0') {
      // раздача erc-20 tokens + native tokens
      return `${symbol} + ${totalAmount.original_native_tokens_amount} ${nativeTokenSymbol}`
    }
    return symbol
  }

  if (type === 'erc1155') {
    const totalAmount = countAssetsTotalAmountERC1155(assets)
    if (String(totalAmount.original_native_tokens_amount) !== '0') {
      // раздача erc-20 tokens + native tokens
      return `${symbol} + ${totalAmount.original_native_tokens_amount} ${nativeTokenSymbol}`
    }
    return symbol
  }
  return ''
}

export default defineTitle