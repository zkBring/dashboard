import {
  COINBASE_CLAIM_URL,
  COINBASE_WALLET_DEEPLINK
} from 'configs/app'
import { TTokenType } from 'linkdrop-batch-sdk/dist/types'

const defineUrlSchema = (
  tokenType: TTokenType,
  decryptedClaimCode: string,
  chainId: number,
  claimAppURL: string,
  version: number,
  wallet: string,
  customClaimHost?: string,
  customClaimHostOn?: boolean
) => {

  if (customClaimHostOn && customClaimHost) {
    return `${claimAppURL}/${decryptedClaimCode}`
  }

  if (wallet === 'coinbase_wallet') {
    if (tokenType === 'ERC1155' || tokenType === 'ERC721') {
      return COINBASE_WALLET_DEEPLINK
        .replace('<ENCODED_CLAIM_URL>', encodeURIComponent(`${claimAppURL}/#/redeem/${decryptedClaimCode}?src=d`))
    }
    const coinbaseLink = COINBASE_CLAIM_URL
      .replace('<CODE>', decryptedClaimCode)
      .replace('<CHAIN_ID>', String(chainId))
      .replace('<VERSION>', String(version))
    return coinbaseLink
  }


  return `${claimAppURL}/#/redeem/${decryptedClaimCode}?src=d`
}

export default defineUrlSchema