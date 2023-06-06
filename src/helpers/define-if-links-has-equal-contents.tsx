import { TLinkDecrypted, TTokenType }  from 'types'
import { defineLinkTokenType } from 'helpers'

const defineIfLinksHasEqualContents = (  
  links: TLinkDecrypted[],
): boolean => {

  const testLink = links[0]
  const tokenType = defineLinkTokenType(
    testLink.token_id,
    testLink.token_amount
  )
  const linksHasEqualContents = links.every(link => {
    if (tokenType === 'ERC721') { return false }
    if (tokenType === 'ERC1155') { return link.token_amount === testLink.token_amount && link.token_id=== testLink.token_id }
    return link.token_amount === testLink.token_amount

  })

  return linksHasEqualContents
}

export default defineIfLinksHasEqualContents
