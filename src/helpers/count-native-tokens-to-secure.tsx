import { add, bignumber, multiply } from 'mathjs'
import { TAssetsData } from 'types'

const countNativeTokensToSecure = (
  nativeTokensAmount: string,
  assets: TAssetsData,
  comissionPrice: number | null,
  sponsored: boolean
) => {
  const comission = bignumber(String(comissionPrice))

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