import { TLinkDetails } from 'types'

type TConstructLink = (linkDetails: TLinkDetails) => string

const constructLink: TConstructLink = ({
  tokenType,
  tokenAddress,
  weiAmount,
  tokenId,
  expirationTime,
  version,
  chainId,
  campaignId,
  linkdropMasterAddress,
  tokenAmount,
  wallet,
  claimAppUrl,
  linkKey,
  linkdropSignerSignature
}) => {
  if (tokenType === 'ERC20') {
    return `${claimAppUrl}/#/receive?tokenAmount=${tokenAmount}&linkdropSignerSignature=${linkdropSignerSignature}&linkKey=${linkKey}&weiAmount=${weiAmount}&linkdropMasterAddress=${linkdropMasterAddress}&wallet=${wallet}&chainId=${chainId}&campaignId=${campaignId}&version=${version}&tokenAddress=${tokenAddress}&expirationTime=${expirationTime}`
  }
  if (tokenType === 'ERC721') {
    return `${claimAppUrl}/#/receive?linkdropSignerSignature=${linkdropSignerSignature}&linkKey=${linkKey}&weiAmount=${weiAmount}&linkdropMasterAddress=${linkdropMasterAddress}&wallet=${wallet}&chainId=${chainId}&campaignId=${campaignId}&version=${version}&nftAddress=${tokenAddress}&expirationTime=${expirationTime}&tokenId=${tokenId}`
  }
  return `${claimAppUrl}/#/receive?tokenAmount=${tokenAmount}&linkdropSignerSignature=${linkdropSignerSignature}&linkKey=${linkKey}&weiAmount=${weiAmount}&linkdropMasterAddress=${linkdropMasterAddress}&wallet=${wallet}&chainId=${chainId}&campaignId=${campaignId}&version=${version}&nftAddress=${tokenAddress}&expirationTime=${expirationTime}&tokenId=${tokenId}`
}

export default constructLink
