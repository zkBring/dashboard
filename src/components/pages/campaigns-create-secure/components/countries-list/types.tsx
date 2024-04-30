import { TCountry } from 'types'

export type TOnRemove = (id: string) => void

export type TProps = {
  data: TCountry[]
  onRemove: TOnRemove
  disabled: boolean
}

