import { TTokenType } from 'types'

type TLinkDetails = {
  tokenType: TTokenType,
  tokenAddress: string,
  weiAmount?: string,
  tokenId?: string | null,
  expirationTime?: string,
  version?: string,
  chainId: string | number,
  campaignId: string,
  linkdropMasterAddress?: string,
  wallet: string,
  claimAppUrl: string,
  linkKey?: string,
  linkdropSignerSignature?: string,
  tokenAmount?: string | null
}

export default TLinkDetails
