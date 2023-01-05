import { TClaimPattern, TTokenType } from "types"
import { TLinksContent } from "../../types"

export type TProps = {
  onClose: () => void,
  onUpload: (assets: TLinksContent) => void,
  tokenStandard: TTokenType | null,
  claimPattern: TClaimPattern
}
