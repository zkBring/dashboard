export type TProps = {
  title?: string,
  placeholder?: string,
  disabled?: boolean,
  onChange: (value: string) => string,
  error?: string,
  value: string,
  className?: string,
  limit?: number,
  tooltip?: string | React.ReactNode
}