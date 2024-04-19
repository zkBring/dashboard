import { addressSpecificOptions } from 'configs/address-specific-options'
const {
  REACT_APP_TESTNETS_URL,
  REACT_APP_MAINNETS_URL
} = process.env


const defineApiParam = () => {
  if (window.location.href.includes(REACT_APP_TESTNETS_URL as string)) {
    return 'testnets'
  } else if (window.location.href.includes(REACT_APP_MAINNETS_URL as string)) {
    return 'mainnets'
  }

  return 'dev'
}

const defineDispenserAppUrl = (
  address: string,
  claimAppURL: string,
  decryptedMultiscanQRSecret: string,
  multiscanQREncCode: string,
  whitelist: boolean
) => {
  const addressFormatted = address.toLowerCase()
  const configForAddress = addressSpecificOptions[addressFormatted]
  const originalLink = `${claimAppURL}/#/mqr/${decryptedMultiscanQRSecret}/${multiscanQREncCode}`

  if (!configForAddress || !configForAddress.dispenserAppUrl || whitelist) {
    return originalLink
  }

  const applicationParam = defineApiParam()

  return `${configForAddress.dispenserAppUrl}/#/mqr/${decryptedMultiscanQRSecret}/${multiscanQREncCode}?api=${applicationParam}`
}

export default defineDispenserAppUrl
