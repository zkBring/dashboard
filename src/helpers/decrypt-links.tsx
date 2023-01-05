import { TLink }  from 'types'
import { decrypt } from 'lib/crypto'

const decryptLinks = (
  links: TLink[],
  dashboard_key: string
) => {
  const decryptedLinks = []
  for (let i = 0; i < links.length; i++) {
    decryptedLinks.push({
      link_id: links[i].link_id,
      claim_link: decrypt(links[i].encrypted_claim_link, dashboard_key)
    })
  }
  return decryptedLinks
}

export default decryptLinks
