const checkERC20Value: (value: string) => boolean = (value) => {
  const itemDivided = value.split(',')
        .map((item: string) => item.trim())
        .filter(item => item)

  console.log({ itemDivided })
  if (itemDivided.length === 1) {
    return checkERC20SingleValue(itemDivided[0])
  }

  if (itemDivided.length === 2) {
    if (itemDivided[0].includes('(')) { return false }
    return itemDivided.every(checkERC20SingleValue)
  }
  // ['0.001(10)']
  // ['0.001']
  // ['0.001, 0.001']
  // ['0.001, 0.001(1)']
  return false
}

const checkERC20SingleValue = (value: string): boolean => {
  if (value.includes('(') && value.includes(')')) {
    const valueAndAmount = value.replace(/\)/i, '').split('(').map((item: string) => item.trim())
    return valueAndAmount.every(item => Boolean(Number(item))) // ['0.001(10)']
  } else {
    console.log({value})
    if (value === '') { return false }
    return !isNaN(Number(value)) // ['0.001']
  }
}

const checkERC20AssetsData = (data: string): boolean => {
  let isValid = false
  if (!data) { return isValid }
  const links = data.split('\n')
  if (!links) { return isValid }
  isValid = links.every(checkERC20Value)
  return isValid
}

export default checkERC20AssetsData