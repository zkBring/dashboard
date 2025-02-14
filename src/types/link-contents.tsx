import { TTokenType} from 'types'

export type TLinkContent = {
  tokenAmount?: string
  linksAmount?: string
  id?: number | string
  type?: TTokenType
  tokenName?: string
}