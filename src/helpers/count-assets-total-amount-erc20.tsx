
import {
  TDefineTotalAmountERC20,
  TTotalAmountERC20,
  TAsset
} from 'types'
import { add, bignumber } from 'mathjs'

const countAssetsTotalAmountERC20: TDefineTotalAmountERC20 = (assets, symbol) => {
  return assets.reduce<TTotalAmountERC20>((sum: TTotalAmountERC20, item: TAsset) => {
    const { nativeTokensAmount, amount, originalAmount, originalNativeTokensAmount } = item
    return {
      ...sum,
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
    amount: bignumber('0'),
    originalNativeTokensAmount: bignumber('0'),
    originalAmount: bignumber('0')
  })
}

export default countAssetsTotalAmountERC20