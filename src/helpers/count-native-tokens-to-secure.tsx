import { LINK_COMISSION_PRICE } from 'configs/app'
import { add, bignumber, multiply } from 'mathjs'
import { TAssetsData } from 'types'

const countNativeTokensToSecure = (
  nativeTokensAmount: string,
  assets: TAssetsData,
  sponsored: boolean
) => {
  const comission = bignumber(String(LINK_COMISSION_PRICE))

  const totalNativeTokensAmount = nativeTokensAmount === '' || nativeTokensAmount === '0' ? 0 : multiply(
    bignumber(nativeTokensAmount),
    assets.length
  )

  const potentialComission = multiply(
    comission,
    assets.length
  )

  const totalComission = sponsored ? potentialComission : 0

  const totalNativeTokensAmountToSecure = !sponsored ? totalNativeTokensAmount : add(
    totalNativeTokensAmount,
    totalComission
  )

  return {
    totalNativeTokensAmount,
    totalComission,
    totalNativeTokensAmountToSecure,
  }
}
export default countNativeTokensToSecure