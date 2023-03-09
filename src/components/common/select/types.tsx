import { TSelectOption } from 'types'

export interface IProps {
  options: TSelectOption[]
  value?: TSelectOption
  placeholder?: string
  className?: string
  onChange: (newValue: TSelectOption) => void
  title?: string
  disabled?: boolean
  note?: string
}