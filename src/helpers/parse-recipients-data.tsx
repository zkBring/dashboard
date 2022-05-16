import { checkRecipientsDataFormat } from './index'
import {
  TTokenType,
  TAsset
} from 'types'
import { utils } from 'ethers';

type TResult<TItemType> = (type: TTokenType, data: string) => TItemType | null
type TResultERC20 = (data: string, decimals: number) => TAsset[] | null


export const parseDataERC1155: TResult<TAsset[]> = (type, data) => {
  if (!data || !type) {
    return null
  }
  const recipientsFormatValid = checkRecipientsDataFormat(type, data)
  if (!recipientsFormatValid) {
    return null
  }
  const recipients = data.split('\n')

  // const recipientsData = recipients.reduce<TERC1155Assets>((memo, item: string) => {
  //   const itemSplit = item.split(',').map((item: string) => item.trim())
  //   return {
  //     ...memo,
  //     [itemSplit[0]]: {
  //       tokenId: itemSplit[1],
  //       amount: itemSplit[2]
  //     }
  //   }
  // }, {})

  return [{ ids: [ 1 ], amount: '1', nativeTokensAmount: '1'}]
}


export const parseDataERC721: TResult<TAsset[]> = (type, data) => {
  // if (!data || !type) {
  //   return null
  // }
  // const recipientsFormatValid = checkRecipientsDataFormat(type, data)
  // if (!recipientsFormatValid) {
  //   return null
  // }
  // const recipients = data.split('\n')

  // const recipientsData = recipients.reduce<TERC721Assets>((memo, item: string) => {
  //   const itemSplit = item.split(',').map((item: string) => item.trim())
  //   return {
  //     ...memo,
  //     [itemSplit[0]]: {
  //       tokenId: itemSplit[1],
  //     }
  //   }
  // }, {})

  return [{ ids: [ 1 ], nativeTokensAmount: '1'}]
}

export const parseDataERC20: TResultERC20 = (data, decimals) => {
  // [
  //   '0.002',
  //   '0.002'(20)
  //   '0.001, 0.001(20)',
  //   '0.001, 0.001',
  // ]

  if (!data) {
    return null
  }

  const recipientsFormatValid = checkRecipientsDataFormat('erc20', data)
  if (!recipientsFormatValid) {
    return null
  }
  const links = data.split('\n')
  // [
  //   '0.002',
  //   '0.002(20)'
  // ]

  const recipientsData = links.reduce<TAsset[]>((memo, item: string) => {
    const itemSplit = item.split(',').map((item: string) => item.trim())
    let assets: TAsset[] = []
    if (itemSplit.length === 1) { //['0.002'] + ['0.002'(20)]
      assets = parseSingleDataERC20(itemSplit[0], decimals)
    } else if (itemSplit.length === 2) { //['0.001, 0.001(20)'] + ['0.001, 0.001']
      assets = parseDoubleDataERC20(item, decimals)
    }
    return [
      ...memo,
      ...assets
    ]
  }, [])
  return recipientsData
}

const parseSingleDataERC20: (value: string, decimals: number) => TAsset[] = (value, decimals) => {
  let result = []
  if (value.includes('(') && value.includes(')')) {
    const valueAndAmount = value.replace(/\)/i, '').split('(').map((item: string) => item.trim())
    
    for (let x = 0; x < Number(valueAndAmount[1]); x++) {
      result.push({
        amount: String(utils.parseUnits(String(valueAndAmount[0]), decimals)),
        nativeTokensAmount: '0'
      })
    }
  } else {
    result.push({
      amount: String(utils.parseUnits(String(value), decimals)),
      nativeTokensAmount: '0'
    })
  }
  return result
}

const parseDoubleDataERC20: (value: string, decimals: number) => TAsset[] = (value, decimals) => {
  let result = []
  if (value.includes('(') && value.includes(')')) {
    const valueAndAmount = value.replace(/\)/i, '').split('(').map((item: string) => item.trim())
    
    for (let x = 0; x < Number(valueAndAmount[1]); x++) {
      const [ tokensValue, nativeTokensAmount ] = valueAndAmount[0].split(',').map(item => item.trim())
      result.push({
        amount: String(utils.parseUnits(String(tokensValue), decimals)),
        nativeTokensAmount: String(utils.parseUnits(String(nativeTokensAmount), 18))
      })
    }
  } else {
    const [ tokensValue, nativeTokensAmount ] = value.split(',').map(item => item.trim())
    result.push({
      amount: String(utils.parseUnits(String(tokensValue), decimals)),
      nativeTokensAmount: String(utils.parseUnits(String(nativeTokensAmount), 18))
    })
  }
  return result
}



