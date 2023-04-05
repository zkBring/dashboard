import {
  countAssetsTotalAmountERC20,
  defineNativeTokenSymbol,
} from 'helpers'
import { TAsset, TTokenType } from 'types'

type TDefineTitle = (
  type: TTokenType,
  assets: TAsset[],
  symbol: string,
  chainId: number,
  decimals?: number | null
) => string

const defineTitle: TDefineTitle = (
  type,
  assets,
  symbol,
  chainId,
  decimals
) => {
  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })
  if (type.toUpperCase() === 'ERC20') {
    const totalAmount = countAssetsTotalAmountERC20(assets, decimals)
    if (symbol === nativeTokenSymbol) {
      // раздача native tokens
      return `${totalAmount.original_amount} ${nativeTokenSymbol}`
    }
    return `${totalAmount.original_amount} ${symbol}`
  }
  if (type.toUpperCase() === 'ERC721') {
    return symbol
  }

  if (type.toUpperCase() === 'ERC1155') {
    return symbol
  }
  return ''
}

export default defineTitle