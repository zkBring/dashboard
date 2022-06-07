
import {
  TDefineTotalAmountERC721,
  TTotalAmount,
  TAsset
} from 'types'
import { add, bignumber } from 'mathjs'

const countAssetsTotalAmountERC1155: TDefineTotalAmountERC721 = (assets) => {
  return assets.reduce<TTotalAmount>((sum: TTotalAmount, item: TAsset) => {
    const { native_tokens_amount, original_native_tokens_amount, id, amount, original_amount } = item
    return {
      ...sum,
      ids: id ? [...(sum.ids || []), id] : sum.ids,
      amount: amount ? add(
        bignumber(item.amount),
        bignumber(sum.amount)
      ) : sum.amount,
      original_amount: original_amount ? add(
        bignumber(item.original_amount),
        bignumber(sum.original_amount)
      ) : sum.original_amount,
      native_tokens_amount: native_tokens_amount ? add(
        bignumber(item.native_tokens_amount),
        bignumber(sum.native_tokens_amount)
      ) : sum.native_tokens_amount,
      original_native_tokens_amount: original_native_tokens_amount ? add(
        bignumber(item.original_native_tokens_amount),
        bignumber(sum.original_native_tokens_amount)
      ) : sum.original_native_tokens_amount
    }  
  }, {
    native_tokens_amount: bignumber('0'),
    ids: [],
    original_native_tokens_amount: bignumber('0'),
    amount: bignumber('0'),
    original_amount: bignumber('0')
  })
}

export default countAssetsTotalAmountERC1155