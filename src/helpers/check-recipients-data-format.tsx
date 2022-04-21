import {
  TTokenType, 
} from 'types'

const checkRecipientsDataFormat = (type: TTokenType, data: string): boolean => {
  const recipients = data.split('\n')
  let isValid = false
  
  if (type === 'erc721' || type === 'erc20') {
    isValid = recipients.every(item => {
      const itemDivided = item.split(',').map((item: string) => item.trim())
      return itemDivided.length > 0 && itemDivided.length <= 2
    })
  }

  if (type === 'erc1155') {
    isValid = recipients.every(item => {
      const itemDivided = item.split(',').map((item: string) => item.trim())
      return itemDivided.length > 1 && itemDivided.length <= 3
    })
  }

  return isValid
}

export default checkRecipientsDataFormat



// erc721
// tokenAddress
// assets: [
//   {
//     id: number,
//     nativeTokensAmount: number
//   }
// ]

// erc721
// tokenAddress
// assets: [
//   {
//     id: number,
//     amount: number,
//     nativeTokensAmount: number
//   }
// ]

// erc20
// tokenAddress
// assets: [
//   {
//     amount: number,
//     nativeTokensAmount: number
//   }
// ]



// erc721
// 1, 0.001
// 2, 0.002

// [1-100], 0.001


// erc1155
// 1, 1, 0.001
// 2, 1, 0.001

// [1-100], 1, 0.001


// erc20
// 1, 0.001
// 1
// 1, 0.001(20)

