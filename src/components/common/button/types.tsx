type TAppearance = 'action' | 'action-inverted' | 'default' | 'default-inverted' | 'additional'
type TTarget = '_blank' | '_self' | '_parent' | '_top'

export type TProps = {
  title?: string,
  disabled?: boolean,
  loading?: boolean,
  onClick?: () => void,
  appearance?: TAppearance,
  className?: string,
  size?: 'default' | 'small',
  href?: string,
  to?: string,
  target?: TTarget,
  type?: string,
}