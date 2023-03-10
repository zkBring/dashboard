export type TOption = {
  title: string
  id: string
  active?: boolean
}

export type TProps = {
  options: TOption[],
  active: string
  onChange: (id: string) => void
}

