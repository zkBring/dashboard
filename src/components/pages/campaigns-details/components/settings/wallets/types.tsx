export type TProps = {
  title: string
  subtitle: string
  onClose: () => void
  id: string
  availableWalletsValue: string[]
  preferredWalletValue: string

  action: (
    availableWalletsValue: string[],
    walletPreferredValue: string,
    successAction?: () => void,
    errorAction?: () => void
  ) => void
}