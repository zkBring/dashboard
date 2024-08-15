import {
  COINBASE_CLAIM_URL
} from 'configs/app'

const defineUrlSchema = (
  decryptedClaimCode: string,
  chainId: number,
  claimAppURL: string,
  version: number,
  wallet: string
) => {

  const defaultLink = `${claimAppURL}/#/redeem/${decryptedClaimCode}?src=d`

  if (
    wallet !== 'coinbase_wallet'
    // for all wallets except coinbase_wallet
  ) {
    return defaultLink
  }

  const url = COINBASE_CLAIM_URL
    .replace('<CODE>', decryptedClaimCode)
    .replace('<CHAIN_ID>', String(chainId))
    .replace('<VERSION>', String(version))

  return url
}

export default defineUrlSchema