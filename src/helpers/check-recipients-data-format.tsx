import {
  TTokenType, 
} from 'types'

const checkRecipientsDataFormat = (type: TTokenType, data: string): boolean => {
  const links = data.split('\n')
  let isValid = false
  if (!data) { return isValid }
  if (type === 'erc721') {
    isValid = links.every(checkERC721Value)
  }

  if (type === 'erc1155') {
    isValid = links.every(item => {
      const itemDivided = item.split(',').map((item: string) => item.trim())
      return itemDivided.length > 1 && itemDivided.length <= 3
    })
  }

  return isValid
}


const checkERC721Value: (value: string) => boolean = (value) => {
  const itemDivided = value.split(',')
        .map((item: string) => item.trim())
  if (itemDivided.length === 1) {
    return checkERC721SingleValue(itemDivided[0])
  }

  if (itemDivided.length === 2) {
    if (itemDivided[1].includes('-')) { return false }
    return itemDivided.every(checkERC721SingleValue)
  }
  // ['1-10']
  // ['1-10, 0.001']
  // ['1']
  // ['1, 0.001']
  return false
}

const checkERC721SingleValue = (value: string): boolean => {
  if (value.includes('-')) {
    const valueAndAmount = value.split('-').map((item: string) => item.trim())
    return valueAndAmount.every(item => Boolean(Number(item))) // ['1-10']
  } else {
    return Boolean(Number(value)) // ['1']
  }
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

