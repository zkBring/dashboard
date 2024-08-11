const {
  REACT_APP_CLIENT
} = process.env
import {
  COINBASE_CLAIM_URL
} from 'configs/app'

const defineUrlSchema = (
  decryptedClaimCode: string,
  chainId: number,
  claimAppURL: string,
  version: number,
  wallet: string,
  availableWallets: string[]
) => {

  if (REACT_APP_CLIENT === 'coinbase') {
    const url = COINBASE_CLAIM_URL
      .replace('<CODE>', decryptedClaimCode)
      .replace('<CHAIN_ID>', String(chainId))
      .replace('<VERSION>', String(version))

    return url
  }
  const defaultLink = `${claimAppURL}/#/redeem/${decryptedClaimCode}?src=d`

  if (wallet !== 'coinbase_wallet') {
    return defaultLink
  }

  if (availableWallets[0] !== 'coinbase_wallet') {
    return defaultLink
  }

  if (availableWallets.length !== 1) {
    return defaultLink
  }

  const url = COINBASE_CLAIM_URL
    .replace('<CODE>', decryptedClaimCode)
    .replace('<CHAIN_ID>', String(chainId))
    .replace('<VERSION>', String(version))

  return url
}

export default defineUrlSchema