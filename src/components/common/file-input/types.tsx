import { TFileFormat } from 'types'

export type TProps = {
  onChange: (
    data: string | null,
    fileObject?: File | null
  ) => any
  name?: string
  placeholder?: string
  className?: string
  sizeAllowed?: number
  formatAllowed?: TFileFormat[]
}