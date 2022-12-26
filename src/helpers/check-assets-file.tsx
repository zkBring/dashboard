import { TLinkContent, TTokenType } from 'types'
const checkAssetsFile = (assets: TLinkContent[], tokenStandard: TTokenType | null) => {
  if (tokenStandard === 'ERC20') {}
  if (tokenStandard === 'ERC721') {}
  if (tokenStandard === 'ERC1155') {}
  return true
}

export default checkAssetsFile
