import { TDispenserStatus } from "types"

export type TProps = {
  hasRedirect?: boolean
  redirectUrl?: string | null
  claimUrl: string
  updateNewRedirectUrl: (
    newRedirectUrl: string,
    successCallback: () => void,
    errorCallback: () => void
  ) => void
  toggleRedirectOn: (
    redirectOn: boolean,
    successCallback: () => void,
    errorCallback: () => void
  ) => void
}

export type TEditInputProps = {
  redirectUrl?: string | null
  onSubmit: (value: string) => void
  onCancel: () => void
  claimUrl: string
  loading?: boolean
}

export type TCopyContainerProps = {
  redirectUrl?: string | null
  onClick: () => void
}