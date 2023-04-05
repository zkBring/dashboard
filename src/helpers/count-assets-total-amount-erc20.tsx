
import {
  TDefineTotalAmountERC20,
  TAsset
} from 'types'
import { utils } from 'ethers'
import { bignumber, BigNumber } from 'mathjs'

const countAssetsTotalAmountERC20: TDefineTotalAmountERC20 = (assets, decimals) => {
  const count = assets.reduce<BigNumber>((sum: BigNumber, item: TAsset) => {
    const { amount } = item
    return amount ? bignumber(item.amount).add(sum) : sum
  }, bignumber('0'))
  const result = {
    amount: count, // atomic
    original_amount: bignumber(utils.formatUnits(String(count), decimals || 18))
  }
  return result
}

export default countAssetsTotalAmountERC20