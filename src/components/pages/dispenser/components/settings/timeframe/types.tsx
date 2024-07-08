import { TDispenser } from "types"

export type TProps = {
  title: string
  subtitle: string
  onClose: () => void
  id: string
  toggleAction?: () => void
  currentDispenser?: TDispenser
  action: (
    startTimeValue: any,
    finishTimeValue: any,
    successAction?: () => void,
    errorAction?: () => void
  ) => void
}