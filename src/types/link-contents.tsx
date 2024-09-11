import { TTokenType} from 'types'

export type TLinkContent = {
  tokenId?: string
  tokenAmount?: string
  linksAmount?: string
  id?: number | string
  type?: TTokenType
  tokenImage?: string
  tokenName?: string
}