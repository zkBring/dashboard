const checkNativeValue: (value: string) => boolean = (value) => {
  const itemDivided = value.split(',')
        .map((item: string) => item.trim())
  if (itemDivided.length === 1) {
    return checkNativeSingleValue(itemDivided[0])
  }
  // ['0.001(10)']
  // ['0.001']
  return false
}

const checkNativeSingleValue = (value: string): boolean => {
  if (value.includes('(') && value.includes(')')) {
    const valueAndAmount = value.replace(/\)/i, '').split('(').map((item: string) => item.trim())
    return valueAndAmount.every(item => Boolean(Number(item))) // ['0.001(10)']
  } else {
    return Boolean(Number(value)) // ['0.001']
  }
}

const checkNativeAssetsData = (data: string): boolean => {
  let isValid = false
  if (!data) { return isValid }
  const links = data.split('\n')
  if (!links) { return isValid }
  isValid = links.every(checkNativeValue)
  return isValid
}

export default checkNativeAssetsData