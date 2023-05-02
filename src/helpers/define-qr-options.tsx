import qrOptions, { addressQrOptions } from 'configs/qr-options'
const {
  REACT_APP_QR_OPTIONS
} = process.env

const defineQROptions = (address: string) => {
  const addressFormatted = address.toLowerCase()
  const configForAddress = addressQrOptions[addressFormatted]
  if (configForAddress) {
    return qrOptions[configForAddress]
  }
  return qrOptions[REACT_APP_QR_OPTIONS || 'linkdrop']
}

export default defineQROptions