import {
  mainnet,
  polygon,
  sepolia,
  base,
  baseGoerli
} from 'wagmi/chains'

const defineWagmiNetwork = (
  chainId: number
) => {
  switch (chainId) {
    case 1:
      return mainnet
    case 137:
      return polygon
    case 8453:
      return base
    case 84531:
      return baseGoerli
    case 11155111:
      return sepolia
    default:
      return base
  }
}

export default defineWagmiNetwork