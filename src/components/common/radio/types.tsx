type TRadio = {
  value: any,
  label: string
}

export type TProps = {
  value?: any,
  radios: TRadio[],
  label: string,
  className?: string,
  disabled?: boolean,
  onChange: (value: any) => void
}

export type TRadioItem = {
  active: boolean,
  disabled?: boolean
}