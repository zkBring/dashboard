import qrOptions from 'configs/qr-options'
import addressSpecificOptions from 'configs/address-specific-options'

const {
  REACT_APP_QR_OPTIONS
} = process.env

const defineQROptions = (address: string) => {
  const addressFormatted = address.toLowerCase()
  const configForAddress = addressSpecificOptions[addressFormatted]
  if (!configForAddress || !configForAddress.qrConfig) {
    return qrOptions[REACT_APP_QR_OPTIONS || 'linkdrop']
  }
  return qrOptions[configForAddress.qrConfig]
}

export default defineQROptions