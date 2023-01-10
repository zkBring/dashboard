export type TOptionItem = {
  title?: string,
  action?: () => void,
  disabled?: boolean,
  icon?: React.ReactNode,
  bordered?: boolean
}

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
  options?: TOptionItem[],
  title?: string,
  subtitle?: string,
  loading?: boolean
}