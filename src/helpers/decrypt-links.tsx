import { TLink, TTokenType, TLinkDetails, TLinkDecrypted }  from 'types'
import { decrypt } from 'lib/crypto'
import { constructLink } from 'helpers'

type TDecryptLink = ({
  links,
  dashboardKey,
  tokenType,
  tokenAddress,
  version,
  chainId,
  campaignId,
  linkdropMasterAddress,
  wallet,
  claimAppUrl
} : {
  links: TLink[],
  dashboardKey: string
} & TLinkDetails) => TLinkDecrypted[]

const decryptLinks: TDecryptLink = ({
  links,
  tokenType,
  tokenAddress,
  version,
  chainId,
  campaignId,
  linkdropMasterAddress,
  wallet,
  claimAppUrl,
  dashboardKey
}) => {
  const decryptedLinks = []
  const start = +new Date()
  for (let i = 0; i < links.length; i++) {

    const encryptedLink = links[i].encrypted_claim_link
    if (encryptedLink && encryptedLink !== 'NO_DATA') {
      decryptedLinks.push({
        link_id: links[i].link_id,
        claim_link: decrypt(encryptedLink, dashboardKey)
      })
    } else {

      const encryptedLinkKey = links[i].encrypted_link_key
      const expirationTime = links[i].expiration_time
      const weiAmount = links[i].wei_amount
      const tokenAmount = links[i].token_amount
      const tokenId = links[i].token_id
      const linkdropSignerSignature = links[i].sender_signature

      if (encryptedLinkKey) {
        const linkKey = decrypt(encryptedLinkKey, dashboardKey)
        const linkParams = {
          weiAmount,
          tokenAddress,
          expirationTime,
          tokenId: tokenType === 'ERC20' ? null : tokenId,
          version,
          chainId,
          campaignId,
          linkdropMasterAddress,
          wallet,
          claimAppUrl,
          dashboardKey,
          linkdropSignerSignature,
          linkKey,
          tokenType,
          tokenAmount
        }

        const link = constructLink(linkParams)
        decryptedLinks.push({
          link_id: links[i].link_id,
          claim_link: link
        })
      }
    }
  }
  console.log(+ new Date() - start)
  return decryptedLinks
}

export default decryptLinks
