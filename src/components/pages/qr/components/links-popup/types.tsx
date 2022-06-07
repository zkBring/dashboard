import { TLink } from 'types'

export type TProps = {
  onClose: () => void,
  onSubmit: (links: TLink[]) => void,
  quantity: number
}