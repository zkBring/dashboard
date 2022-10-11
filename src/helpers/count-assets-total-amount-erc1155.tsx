
import {
  TDefineTotalAmountERC721,
  TTotalAmount,
  TAsset
} from 'types'
import { add, bignumber } from 'mathjs'

const countAssetsTotalAmountERC1155: TDefineTotalAmountERC721 = (assets) => {
  return assets.reduce<TTotalAmount>((sum: TTotalAmount, item: TAsset) => {
    const { id, amount, original_amount } = item
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
    }  
  }, {
    ids: [],
    amount: bignumber('0'),
    original_amount: bignumber('0')
  })
}

export default countAssetsTotalAmountERC1155