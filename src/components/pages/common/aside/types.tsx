export type TOptionItem = {
  title?: string,
  action?: () => void
  disabled?: boolean
  icon?: React.ReactNode
  bordered?: boolean
}

export type TProps = {
  className?: string
  children?: React.ReactNode
  options?: TOptionItem[]
  title?: string
  subtitle?: string
  loading?: boolean
}