import { ERC20Contract, ERC1155Contract, ERC721Contract } from 'abi'
import { TTokenType } from 'types'

const defineContract = (tokenStandard: TTokenType) => {
  switch (tokenStandard) {
    case 'ERC1155':
      return ERC1155Contract
    case 'ERC721':
      return ERC721Contract
    case 'ERC20':
    default:
      return ERC20Contract
  }
}

export default defineContract