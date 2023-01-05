
import {
  TDefineTotalAmountERC721,
  TTotalAmount,
  TAsset
} from 'types'
import { add, bignumber } from 'mathjs'

const countAssetsTotalAmountERC721: TDefineTotalAmountERC721 = (assets) => {
  return assets.reduce<TTotalAmount>((sum: TTotalAmount, item: TAsset) => {
    const { id } = item
    return {
      ...sum,
      ids: id ? [...(sum.ids || []), id] : sum.ids,
    }  
  }, {
    ids: []
  })
}

export default countAssetsTotalAmountERC721