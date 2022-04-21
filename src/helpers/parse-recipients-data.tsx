import { checkRecipientsDataFormat } from './index'
import {
  TTokenType,
  TERC1155Assets,
  TERC721Assets,
  TERC20Assets,
} from 'types'
import { utils } from 'ethers';

type TResult<TItemType> = (type: TTokenType, data: string) => TItemType | null
type TResultERC20 = (type: TTokenType, data: string, decimals: number) => TERC20Assets | null


export const parseDataERC1155: TResult<TERC1155Assets> = (type, data) => {
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

  return [{ id: '1', amount: '1', nativeTokensAmount: '1'}]
}


export const parseDataERC721: TResult<TERC721Assets> = (type, data) => {
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

  return [{ id: '1', nativeTokensAmount: '1'}]
}

export const parseDataERC20: TResultERC20 = (type, data, decimals) => {
  // console.log({ data })
  // if (!data || !type) {
  //   return null
  // }
  // const recipientsFormatValid = checkRecipientsDataFormat(type, data)
  // if (!recipientsFormatValid) {
  //   return null
  // }
  // const recipients = data.split('\n')
  // console.log({ recipients })

  // const recipientsData = recipients.reduce<TItemERC20>((memo, item: string) => {
  //   const itemSplit = item.split(',').map((item: string) => item.trim())
  //   const amount = String(utils.parseUnits(String(itemSplit[1]), decimals))
  //   return {
  //     ...memo,
  //     [itemSplit[0]]: {
  //       amount,
  //     }
  //   }
  // }, {})

  return [{ amount: '1', nativeTokensAmount: '1'}]
}




