
import {
  TDefineTotalAmountERC721,
  TTotalAmount,
  TAsset
} from 'types'
import { add, bignumber } from 'mathjs'

const countAssetsTotalAmountERC721: TDefineTotalAmountERC721 = (assets) => {
  return assets.reduce<TTotalAmount>((sum: TTotalAmount, item: TAsset) => {
    const { native_tokens_amount, original_native_tokens_amount, id } = item
    return {
      ...sum,
      ids: id ? [...(sum.ids || []), id] : sum.ids,
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
    original_native_tokens_amount: bignumber('0')
  })
}

export default countAssetsTotalAmountERC721