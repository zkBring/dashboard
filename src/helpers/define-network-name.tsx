const defineNetworkName = (chainId: number | null) : string => {
  switch (chainId) {
    case 1: return 'mainnet'
    case 5: return 'goerli'
    case 137: return 'polygon'
    case 80001: return 'mumbai'
    case 8453: return 'base'
    case 84531: return 'baseGoerli'
    default: return 'mainnet'
  }
}

export default defineNetworkName