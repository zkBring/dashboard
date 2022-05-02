import { checkNativeAssetsData } from './index'
import {
  TAsset
} from 'types'
import { utils } from 'ethers';

type TResultERC20 = (data: string, decimals: number) => TAsset[] | null

const parseNativeAssetsData: TResultERC20 = (data, decimals) => {
  // [
  //   '0.002',
  //   '0.002'(20)
  // ]

  if (!data) {
    return null
  }

  const recipientsFormatValid = checkNativeAssetsData(data)
  if (!recipientsFormatValid) {
    return null
  }
  const links = data.split('\n')
  // [
  //   '0.002',
  //   '0.002(20)'
  // ]

  const recipientsData = links.reduce<TAsset[]>((memo, item: string) => {
    let assets: TAsset[] = parseSingleDataNative(item, decimals)
    return [
      ...memo,
      ...assets
    ]
  }, [])
  return recipientsData
}

const parseSingleDataNative: (value: string, decimals: number) => TAsset[] = (value, decimals) => {
  let result = []
  if (value.includes('(') && value.includes(')')) {
    const valueAndAmount = value.replace(/\)/i, '').split('(').map((item: string) => item.trim())
    for (let x = 0; x < Number(valueAndAmount[1]); x++) {
      result.push({
        originalNativeTokensAmount: String(valueAndAmount[0]),
        nativeTokensAmount: String(utils.parseUnits(String(valueAndAmount[0]), decimals))
      })
    }
  } else {
    result.push({
      originalNativeTokensAmount: String(value),
      nativeTokensAmount: String(utils.parseUnits(String(value), decimals))
    })
  }
  return result
}

export default parseNativeAssetsData
