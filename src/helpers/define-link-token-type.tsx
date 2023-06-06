import { TTokenType } from 'types'

type TDefineLinkTokenType = (tokenId?: string | null, tokenAmount?: string | null) => TTokenType

const defineLinkTokenType: TDefineLinkTokenType = (
  tokenId, tokenAmount
  ) => {
  if (tokenId && tokenAmount) {
    return 'ERC1155'
  } else if (tokenAmount) {
    return 'ERC20'
  } else {
    return 'ERC721'
  }
}

export default defineLinkTokenType