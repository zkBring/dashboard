import { TLinksContent } from '../../types'
import { TTokenType, TClaimPattern } from 'types'

export type TOnRemove = (id: number) => void

export type TProps = {
  data: TLinksContent
  type: TTokenType
  onRemove: TOnRemove
  sdk: boolean
  claimPattern: TClaimPattern
}