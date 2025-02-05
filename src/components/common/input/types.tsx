export type TProps<TLoadingType = boolean> = {
  title?: string
  disabled?: boolean
  loading?: TLoadingType
  onChange: (value: string) => string
  className?: string
  type?: string
  value: string
  children?: React.ReactNode
  placeholder?: string
}
