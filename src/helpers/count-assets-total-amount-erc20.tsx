
import {
  TDefineTotalAmountERC20,
  TTotalAmount,
  TAsset
} from 'types'
import { add, bignumber } from 'mathjs'

const countAssetsTotalAmountERC20: TDefineTotalAmountERC20 = (assets) => {
  return assets.reduce<TTotalAmount>((sum: TTotalAmount, item: TAsset) => {
    const { amount, original_amount } = item
    return {
      ...sum,
      amount: amount ? add(
        bignumber(item.amount),
        bignumber(sum.amount)
      ) : sum.amount,
      original_amount: original_amount ? add(
        bignumber(item.original_amount),
        bignumber(sum.original_amount)
      ) : sum.original_amount,
    }  
  }, {
    amount: bignumber('0'),
    original_amount: bignumber('0')
  })
}

export default countAssetsTotalAmountERC20