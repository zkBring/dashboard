import { IPFS_GATEWAY_URL } from 'configs/app'

const replaceIPFS = (value: string): string => {
  let initialValue = value
  if (!initialValue.startsWith('ipfs://')) {
    return initialValue
  }
  while (initialValue.startsWith('ipfs://')) {
    const urlParts = initialValue.split('/')
    initialValue = `${IPFS_GATEWAY_URL}/${urlParts[urlParts.length - 1]}`
  }
  return initialValue
}

export default replaceIPFS
