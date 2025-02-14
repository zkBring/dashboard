import { TSelectOption } from "types"

type TProps = {
  title?: string
  disabled?: boolean
  onChange: (value: TSelectOption) => void
  className?: string
  type?: string
  value: TSelectOption
  children?: React.ReactNode
  placeholder?: string
  options: TSelectOption[]
  notFoundActiveCondition?: (value: string) => boolean
}

export default TProps