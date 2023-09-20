import { TDispenserWhitelistType } from "types"

export type TProps = {
  isWhitelisted?: boolean
  dispenserId: string
  whitelistType: TDispenserWhitelistType
  toggleWhitelistOn: (
    whitelistOn: boolean,
    successCallback: () => void,
    errorCallback: () => void
  ) => void
}
