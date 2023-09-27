import { TDispenserWhitelistItemAddress, TDispenserWhitelistType } from "types"

export type TProps = {
  isWhitelisted?: boolean
  dispenserId: string
  whitelistType?: TDispenserWhitelistType
  loading: boolean
  toggleWhitelistOn: (
    whitelistOn: boolean,
    successCallback: () => void,
    errorCallback: () => void
  ) => void
}
