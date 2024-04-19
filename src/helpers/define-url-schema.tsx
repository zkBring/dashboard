import { addressSpecificOptions } from 'configs/address-specific-options'

const defineUrlSchema = (
  address: string,
  decryptedClaimCode: string,
  chainId: number,
  claimAppURL: string,
  version: number,
  wallet: string
) => {
  const addressFormatted = address.toLowerCase()
  const configForAddress = addressSpecificOptions[addressFormatted]
  const defaultLink = `${claimAppURL}/#/redeem/${decryptedClaimCode}?src=d`

  if (!configForAddress || !configForAddress.claimUrlSchema) {
    return defaultLink
  }
  const schemaObj = configForAddress.claimUrlSchema

  if (wallet !== schemaObj.wallet) {
    return defaultLink
  }

  const url = schemaObj.schema
    .replace('<CODE>', decryptedClaimCode)
    .replace('<CHAIN_ID>', String(chainId))
    .replace('<VERSION>', String(version))

  return url
}

export default defineUrlSchema