export interface IProps {
  title?: string,
  placeholder?: string,
  type?: string,
  name?: string,
  disabled?: boolean,
  onChange: (value: string) => string,
  error?: string,
  value?: string,
  className?: string,
  ref?: { current: any }
}
