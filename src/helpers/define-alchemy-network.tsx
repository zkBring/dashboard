import { Network } from 'alchemy-sdk'

type TDefineAlchemyNetwork = (
  chainId: number
) => Network | undefined

const defineAlchemyNetwork: TDefineAlchemyNetwork = (
  chainId
) => {
  console.log({ chainId })
  switch (chainId) {
    case 1:
      return Network.ETH_MAINNET
    case 5:
      return Network.ETH_GOERLI
    case 137:
      return Network.MATIC_MAINNET
    case 80001:
      return Network.MATIC_MUMBAI
    default: 
      return
  }
}

export default defineAlchemyNetwork