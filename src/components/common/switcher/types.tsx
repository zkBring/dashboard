export type TOption = {
  title: string
  id: string
  active?: boolean
  disabled?: boolean
}

export type TProps = {
  options: TOption[],
  active: string
  title?: string
  disabled?: boolean
  onChange: (id: string) => void
}

