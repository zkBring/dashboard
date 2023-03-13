import { TSelectOption } from 'types'
import { MutableRefObject, RefObject } from 'react'

export interface IProps {
  options: TSelectOption[]
  value?: TSelectOption | null
  placeholder?: string
  className?: string
  onChange: (newValue: TSelectOption) => void
  title?: string
  disabled?: boolean
  note?: string
  notFoundActiveCondition?: (value: string) => boolean
}