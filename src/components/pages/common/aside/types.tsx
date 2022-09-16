export type TProps = {
  back?: {
    action?: () => void,
    title?: string,
    disabled?: boolean
  },
  next?: {
    action?: () => void,
    title?: string,
    disabled?: boolean
  },
  title: string,
  subtitle: string
}