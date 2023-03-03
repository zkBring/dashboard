import { TLink, TLinkDecrypted }  from 'types'
import { decrypt } from 'lib/crypto'
const { REACT_APP_CLAIM_APP } = process.env

type TDecryptLink = ({
  links,
  dashboardKey
} : {
  links: TLink[],
  dashboardKey: string
}
) => TLinkDecrypted[]

const decryptLinks: TDecryptLink = ({
  links,
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
      const encryptedClaimCode = links[i].encrypted_claim_code
      if (encryptedClaimCode) {
        decryptedLinks.push({
          link_id: links[i].link_id,
          claim_link: `${REACT_APP_CLAIM_APP}/#/claim/${decrypt(encryptedClaimCode, dashboardKey)}`
        })
      }
    }
  }
  console.log(+ new Date() - start)
  return decryptedLinks
}

export default decryptLinks
