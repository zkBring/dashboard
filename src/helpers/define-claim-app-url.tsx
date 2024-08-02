import { addressSpecificOptions } from 'configs/address-specific-options'

const {
  REACT_APP_CLAIM_APP,
  REACT_APP_CBW_CLAIM_APP,
  REACT_APP_CLIENT
} = process.env

const defineClaimAppURL = (
  address: string
) => {
  if (REACT_APP_CLIENT === 'coinbase') {
    return REACT_APP_CBW_CLAIM_APP || ''
  }
  const addressFormatted = address.toLowerCase()
  const configForAddress = addressSpecificOptions[addressFormatted]
  if (!configForAddress || !configForAddress.claimAppUrl) {
    return REACT_APP_CLAIM_APP || ''
  }
  return configForAddress.claimAppUrl
}

export default defineClaimAppURL