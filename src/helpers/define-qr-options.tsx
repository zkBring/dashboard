import qrOptions from 'configs/qr-options'
import { addressSpecificOptions } from 'configs/address-specific-options'

const {
  REACT_APP_QR_OPTIONS,
  REACT_APP_CLIENT
} = process.env

const defineQROptions = (address: string) => {
  if (REACT_APP_CLIENT === 'coinbase') {
    const coinbaseConfig = addressSpecificOptions['coinbase']
    const qrConfig = coinbaseConfig.qrConfig
    if (!qrConfig) {
      return qrOptions[REACT_APP_QR_OPTIONS || 'linkdrop']
    }
    return qrOptions[qrConfig]
  }
  const addressFormatted = address.toLowerCase()
  const configForAddress = addressSpecificOptions[addressFormatted]
  if (!configForAddress || !configForAddress.qrConfig) {
    return qrOptions[REACT_APP_QR_OPTIONS || 'linkdrop']
  }
  return qrOptions[configForAddress.qrConfig]
}

export default defineQROptions