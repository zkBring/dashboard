import { addressSpecificOptions } from 'configs/address-specific-options'

const {
  REACT_APP_CLAIM_APP,
  REACT_APP_CBW_CLAIM_APP
} = process.env

const defineClaimAppURL = (
  address: string,
  available_wallets?: string[]
) => {
  if (available_wallets && available_wallets.length === 1 && available_wallets[0] === 'coinbase_wallet') {
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