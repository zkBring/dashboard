import { TLinkContent } from 'types'

export type TProps = {
  onClose: () => void
  id: number | string
  assets: TLinkContent[]
  onUpdate: (assetId: number | string, linksAmount: string) => void
}