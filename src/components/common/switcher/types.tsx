export type TOption = {
  title: string
  id: string
  active?: boolean
  disabled?: boolean
  loading?: boolean
  additionalTag?: React.ReactNode
}

export type TProps = {
  options: TOption[]
  active: string
  title?: string
  disabled?: boolean
  className?: string
  onChange: (id: string) => void
}
