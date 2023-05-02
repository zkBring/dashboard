import { addressQRLinkPrefixOptions } from 'configs/qr-options'

const defineIfQRIsDeeplink = (address: string) => {
  const addressFormatted = address.toLowerCase()
  const configForAddress = addressQRLinkPrefixOptions[addressFormatted]
  if (!configForAddress) {
    return
  }
  return configForAddress
}

export default defineIfQRIsDeeplink
