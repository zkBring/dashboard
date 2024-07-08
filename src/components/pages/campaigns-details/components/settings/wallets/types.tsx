import { TTokenType } from "types"

export type TProps = {
  title: string
  subtitle: string
  onClose: () => void
  id: string
  availableWalletsValue: string[]
  preferredWalletValue: string

  tokenType: TTokenType

  sponsored: boolean

  chainId: number

  loading: boolean

  action: (
    availableWalletsValue: string[],
    walletPreferredValue: string,
    successAction?: () => void,
    errorAction?: () => void
  ) => void
}