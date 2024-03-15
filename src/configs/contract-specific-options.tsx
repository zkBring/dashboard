import { TTokenType } from "types"

type TContractConfig = Record<
  string,
  {
    tokenType: TTokenType
  }
>

const ERC1155_CONFIG = {
  tokenType: 'ERC1155' as TTokenType
}

export const contractSpecificOptions: TContractConfig = {
  '0xeefd9c76d2eb3e2dfb0973a1bc61e77de516a4e0': ERC1155_CONFIG
}
