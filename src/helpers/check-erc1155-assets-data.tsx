// 1, 1
// 1, 1, 0.001
// 1, 1, 0.001(50)
// 1, 1(50)

const checkERC1155Value: (value: string) => boolean = (value) => {
  const itemDivided = value.split(',')
        .map((item: string) => item.trim())
        .filter(item => item)

  if (itemDivided.length === 2 || itemDivided.length === 3) {
    if (itemDivided[0].includes('(')) { return false }
    return itemDivided.every(check)
  }

  // ['0.001(10)']
  // ['0.001']
  // ['0.001, 0.001']
  // ['0.001, 0.001(1)']
  return false
}

const check = (value: string): boolean => {
  if (value.includes('(') && value.includes(')')) {
    const valueAndAmount = value.replace(/\)/i, '').split('(').map((item: string) => item.trim())
    return valueAndAmount.every(item => Boolean(Number(item))) // ['0.001(10)']
  } else {
    if (value === '') { return false }
    return !isNaN(Number(value)) // ['0.001']
  }
}

const checkERC1155AssetsData = (data: string): boolean => {
  let isValid = false
  if (!data) { return isValid }
  const links = data.split('\n')
  if (!links) { return isValid }
  isValid = links.every(checkERC1155Value)
  return isValid
}

export default checkERC1155AssetsData