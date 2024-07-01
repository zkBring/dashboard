export type TProps = {
  title: string
  subtitle: string
  onClose: () => void
  id: string
  toggleAction?: (value: boolean) => void
  toggleValue?: boolean
  whitelistValue?: string | null
  action: (
    value: any,
    successAction?: () => void,
    errorAction?: () => void
  ) => void
}