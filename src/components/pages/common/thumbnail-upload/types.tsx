import { TFileFormat } from 'types'

export type TProps = {
  thumbnail?: string
  setThumbnail: (value: string) => void
  setFile: (value: File) => void
  title: string
  note: string
  subtitle?: string
  sizeAllowed?: number
  formatAllowed?: TFileFormat[]
}