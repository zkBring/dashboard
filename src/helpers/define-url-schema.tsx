import { addressSpecificOptions } from 'configs/address-specific-options'

const defineUrlSchema = (
  address: string,
  decryptedClaimCode: string,
  chainId: number,
  claimAppURL: string,
  version: number
) => {
  const addressFormatted = address.toLowerCase()
  const configForAddress = addressSpecificOptions[addressFormatted]
  if (!configForAddress || !configForAddress.claimUrlSchema) {
    return `${claimAppURL}/#/redeem/${decryptedClaimCode}?src=d`
  }
  const url = configForAddress.claimUrlSchema
    .replace('<CODE>', decryptedClaimCode)
    .replace('<CHAIN_ID>', String(chainId))
    .replace('<VERSION>', String(version))

  return url
}

export default defineUrlSchema