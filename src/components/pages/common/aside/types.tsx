export type TProps = {
  back?: {
    action?: () => void,
    title?: string,
    disabled?: boolean,
    loading?: boolean
  },
  next?: {
    action?: () => void,
    title?: string,
    disabled?: boolean,
    loading?: boolean
  },
  title?: string,
  subtitle?: string
}