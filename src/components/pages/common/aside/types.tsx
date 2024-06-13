import { TButtonAppearance } from 'types'

export type TOptionItem = {
  title?: string,
  action?: () => void
  disabled?: boolean
  icon?: React.ReactNode
  bordered?: boolean
}

export type TProps = {
  back?: {
    action?: () => void
    title?: string
    disabled?: boolean
    loading?: boolean
    appearance?: TButtonAppearance
  }
  next?: {
    action?: () => void
    title?: string
    disabled?: boolean
    loading?: boolean
    appearance?: TButtonAppearance
  }
  options?: TOptionItem[]
  title?: string
  subtitle?: string
  loading?: boolean
  className?: string
  children?: React.ReactNode
}