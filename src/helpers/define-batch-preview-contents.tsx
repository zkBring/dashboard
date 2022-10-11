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
  if (type.toUpperCase() === 'ERC20') {
    const totalAmount = countAssetsTotalAmountERC20(assets)
    console.log(totalAmount.original_amount)
    if (symbol === nativeTokenSymbol) {
      // раздача native tokens
      return `0 ${nativeTokenSymbol}`
    }
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