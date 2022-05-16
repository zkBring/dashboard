
import {
  TDefineTotalAmountERC721,
  TTotalAmount,
  TAsset
} from 'types'
import { add, bignumber } from 'mathjs'

const countAssetsTotalAmountERC721: TDefineTotalAmountERC721 = (assets) => {
  return assets.reduce<TTotalAmount>((sum: TTotalAmount, item: TAsset) => {
    const { nativeTokensAmount, originalNativeTokensAmount, id } = item
    return {
      ...sum,
      ids: id ? [...(sum.ids || []), id] : sum.ids,
      nativeTokensAmount: nativeTokensAmount ? add(
        bignumber(item.nativeTokensAmount),
        bignumber(sum.nativeTokensAmount)
      ) : sum.nativeTokensAmount,
      originalNativeTokensAmount: originalNativeTokensAmount ? add(
        bignumber(item.originalNativeTokensAmount),
        bignumber(sum.originalNativeTokensAmount)
      ) : sum.originalNativeTokensAmount
    }  
  }, {
    nativeTokensAmount: bignumber('0'),
    ids: [],
    originalNativeTokensAmount: bignumber('0')
  })
}

export default countAssetsTotalAmountERC721