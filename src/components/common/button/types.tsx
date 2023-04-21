import { TButtonAppearance } from 'types'

type TButtonTarget = '_blank' | '_self' | '_parent' | '_top'

export type TProps<TLoadingType = boolean> = {
  title?: string
  disabled?: boolean
  loading?: TLoadingType
  onClick?: () => void
  appearance?: TButtonAppearance
  className?: string
  size?: 'default' | 'extra-small' | 'small' | 'large'
  href?: string
  to?: string
  target?: TButtonTarget
  type?: string
  children?: React.ReactNode
}
