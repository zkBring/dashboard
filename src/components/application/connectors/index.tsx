// import {
//   EthereumClient,
//   w3mConnectors,
//   w3mProvider
// } from "@web3modal/ethereum"
// import { configureChains, createClient } from "wagmi"
// import { mainnet, polygon, goerli, polygonMumbai } from "wagmi/chains"
// const { REACT_APP_WC_PROJECT_ID } = process.env

// const chains = [goerli, polygonMumbai]

// // Wagmi client
// const { provider } = configureChains(chains, [w3mProvider({ projectId: REACT_APP_WC_PROJECT_ID as string })]);
// console.log({ provider })
// const wagmiClient = createClient({
//   connectors: w3mConnectors({
//     projectId: REACT_APP_WC_PROJECT_ID as string,
//     version: 2,
//     chains
//   }),
//   provider
// })

// const ethereumClient = new EthereumClient(wagmiClient, chains)

// export {
//   wagmiClient,
//   ethereumClient
// }


import {
  EthereumClient,
  w3mConnectors,
  w3mProvider
} from "@web3modal/ethereum"
import { configureChains, createClient } from "wagmi"
import { mainnet, polygon, goerli, polygonMumbai } from "wagmi/chains"
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { InjectedConnector } from 'wagmi/connectors/injected'
const { REACT_APP_WC_PROJECT_ID } = process.env
const chains = [mainnet, polygon, goerli, polygonMumbai]

// Wagmi client
const { provider } = configureChains(chains, [
  w3mProvider({
    projectId: REACT_APP_WC_PROJECT_ID as string
  })
])

const wagmiClient = createClient({
  connectors: [
    new WalletConnectConnector({
      chains, options: {
        projectId: REACT_APP_WC_PROJECT_ID as string
      }
    }),
    new InjectedConnector({
      chains
    })
  ],
  provider,
  
})

const ethereumClient = new EthereumClient(wagmiClient, chains)

export {
  wagmiClient,
  ethereumClient
}