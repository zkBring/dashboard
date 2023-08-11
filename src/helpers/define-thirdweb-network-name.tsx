const defineThirdwebNetworkName = (chainId: number | null) : string => {
  switch (chainId) {
    case 1: return 'ethereum'
    case 5: return 'goerli'
    case 137: return 'polygon'
    case 80001: return 'mumbai'
    case 8453: return 'base'
    case 84531: return 'base-goerli'
    default: return 'ethereum'
  }
}

export default defineThirdwebNetworkName