import { TLinkDecrypted } from 'types'

export type TProps = {
  onClose: () => void,
  onSubmit: (links: TLinkDecrypted[]) => void,
  loader: number,
  loading: boolean
}