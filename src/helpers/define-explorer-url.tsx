import defineNetworkName from './define-network-name'
import chains from 'configs/chains'

type TDefineExplorerURL = (chainId: number | null, value: string) => string | void

const defineExplorerUrl: TDefineExplorerURL = (chainId, value) => {
  if (chainId) {
    const chainConfig =  chains[chainId]
    if (chainConfig) {
      const { blockExplorerUrls } = chainConfig
      if (blockExplorerUrls) {
        const explorerURL = blockExplorerUrls[0]
        if (explorerURL) { return `${explorerURL}${value}`}
      }
    }
    const networkName = defineNetworkName(chainId)
    return `https://${networkName}.etherscan.io${value}` 
  }
}

export default defineExplorerUrl