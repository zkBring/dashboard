const {
  REACT_APP_TESTNETS_URL,
  REACT_APP_MAINNETS_URL,
  REACT_APP_DISPENSER_APP_URL,
  REACT_APP_DYNAMIC_DISPENSER_APP_URL
} = process.env


const defineApiParam = () => {
  if (window.location.href.includes(REACT_APP_TESTNETS_URL as string)) {
    return 'testnets'
  } else if (window.location.href.includes(REACT_APP_MAINNETS_URL as string)) {
    return ''
  }

  return 'dev'
}

const defineDispenserAppUrl = (
  claimAppURL: string,
  decryptedMultiscanQRSecret: string,
  multiscanQREncCode: string,
  whitelist: boolean,
  dynamic: boolean
) => {
  const originalLink = `${claimAppURL}/#/mqr/${decryptedMultiscanQRSecret}/${multiscanQREncCode}`

  if (whitelist) {
    return originalLink
  }

  const applicationParam = defineApiParam()
  const params = applicationParam ? `?api=${applicationParam}` : ''

  if (dynamic) {
    return `${REACT_APP_DYNAMIC_DISPENSER_APP_URL as string}/#/mqr/${decryptedMultiscanQRSecret}/${multiscanQREncCode}${params}`
  }

  return `${REACT_APP_DISPENSER_APP_URL as string}/#/mqr/${decryptedMultiscanQRSecret}/${multiscanQREncCode}${params}`
}

export default defineDispenserAppUrl
