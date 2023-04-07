
import {
  TDefineTotalAmountERC20,
  TAsset
} from 'types'
import { utils, BigNumber } from 'ethers'

const countAssetsTotalAmountERC20: TDefineTotalAmountERC20 = (assets, decimals) => {
  console.log({ assets })
  const count = assets.reduce<BigNumber>((sum: BigNumber, item: TAsset) => {
    const { amount } = item
    return amount ? BigNumber.from(item.amount).add(sum) : sum
  }, BigNumber.from('0'))

  const result = {
    amount: count, // atomic
    original_amount: BigNumber.from(parseInt(utils.formatUnits(count, decimals || 18)))
  }
  return result

}

export default countAssetsTotalAmountERC20