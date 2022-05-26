
import {
  TDefineTotalAmountERC721,
  TTotalAmount,
  TAsset
} from 'types'
import { add, bignumber } from 'mathjs'

const countAssetsTotalAmountERC1155: TDefineTotalAmountERC721 = (assets) => {
  return assets.reduce<TTotalAmount>((sum: TTotalAmount, item: TAsset) => {
    const { nativeTokensAmount, originalNativeTokensAmount, id, amount, originalAmount } = item
    return {
      ...sum,
      ids: id ? [...(sum.ids || []), id] : sum.ids,
      amount: amount ? add(
        bignumber(item.amount),
        bignumber(sum.amount)
      ) : sum.amount,
      originalAmount: originalAmount ? add(
        bignumber(item.originalAmount),
        bignumber(sum.originalAmount)
      ) : sum.originalAmount,
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
    originalNativeTokensAmount: bignumber('0'),
    amount: bignumber('0'),
    originalAmount: bignumber('0')
  })
}

export default countAssetsTotalAmountERC1155