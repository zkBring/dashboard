export interface IProps {
  title?: string
  placeholder?: string
  disabled?: boolean
  onChange: (value: string) => string
  error?: string
  value?: string
  className?: string
  note?: string
  refProp?: React.Ref<HTMLTextAreaElement>
}

export interface TextareaContainerProps {
  disabled: boolean
  error?: string
  className?: string
}

export interface TextareaFieldProps {
  value: string
  error?: string
}

export interface TextareaTitleProps {
  error?: string
}
