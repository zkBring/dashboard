export interface IProps {
  title?: string
  placeholder?: string
  type?: string
  name?: string
  disabled?: boolean
  onChange: (value: string) => string
  onClick?: () => void
  error?: string
  value?: string
  className?: string
  note?: string
  refProp?: React.Ref<HTMLInputElement>
  icon?: React.ReactNode
  prefix?: string
}

export interface InputContainerProps {
  disabled: boolean
  error?: string
  className?: string
}

export interface InputFieldProps {
  value: string
  error?: string
}

export interface InputTitleProps {
  error?: string
}
