export type TProps = {
  onChange: (
    data: string | null,
    fileObject?: File | null
  ) => any
  name?: string
  placeholder?: string
  className?: string
}