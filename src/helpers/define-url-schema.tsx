import {
  COINBASE_CLAIM_URL
} from 'configs/app'

const defineUrlSchema = (
  decryptedClaimCode: string,
  chainId: number,
  claimAppURL: string,
  version: number,
  wallet: string,
  customClaimHost?: string,
  customClaimHostOn?: boolean
) => {

  if (wallet === 'coinbase_wallet') {
    const coinbaseLink = COINBASE_CLAIM_URL
      .replace('<CODE>', decryptedClaimCode)
      .replace('<CHAIN_ID>', String(chainId))
      .replace('<VERSION>', String(version))
    return coinbaseLink
  }

  if (customClaimHostOn && customClaimHost) {
    return `${claimAppURL}/${decryptedClaimCode}`
  }

  return `${claimAppURL}/#/redeem/${decryptedClaimCode}?src=d`
}

export default defineUrlSchema