import { TDispenser } from "types"

export type TProps = {
  title: string
  subtitle: string
  onClose: () => void
  id: string
  toggleAction?: (value: boolean) => void
  toggleValue?: boolean
  whitelistValue?: string | null
  loading: boolean
  currentDispenser?: TDispenser
  getDispenserWhitelist: (dispenserId: string) => void
  action: (
    value: any,
    successAction?: () => void,
    errorAction?: () => void
  ) => void
}