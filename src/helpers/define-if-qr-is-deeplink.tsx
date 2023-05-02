import addressSpecificOptions from 'configs/address-specific-options'

const defineIfQRIsDeeplink = (address: string) => {
  const addressFormatted = address.toLowerCase()
  const configForAddress = addressSpecificOptions[addressFormatted]
  if (!configForAddress || !configForAddress.qrDeeplink) {
    return
  }
  return configForAddress.qrDeeplink
}

export default defineIfQRIsDeeplink
