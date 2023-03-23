import { TLinkContent } from 'types'
export type TProps = {
  onClose: () => void
  id: number
  assets: TLinkContent[]
  onUpdate: (assetId: number, linksAmount: string) => void
}