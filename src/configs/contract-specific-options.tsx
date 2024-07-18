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
  '0xeefd9c76d2eb3e2dfb0973a1bc61e77de516a4e0': ERC1155_CONFIG,
  '0xe0195b5e2c917fb3174d19ddff8a92a993b54981': ERC1155_CONFIG,
  '0x20db9a6007d1735727dec15808578ba39cabf7dd': ERC1155_CONFIG
}
