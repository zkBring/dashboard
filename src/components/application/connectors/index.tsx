import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import {
  zeroChain
} from 'configs/chains'
import {
  base
} from 'wagmi/chains'
import { http } from 'wagmi'
import { QueryClient } from '@tanstack/react-query'

import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors'

const { REACT_APP_WC_PROJECT_ID } = process.env

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = REACT_APP_WC_PROJECT_ID as string

// 2. Create wagmiConfig
const metadata = {
  name: 'zkBring Dashboard App',
  description: 'zkBring Dashboard App',
  url: 'https://zkbring.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [
  base
] as const

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  connectors: [
    walletConnect({
      projectId,
      metadata,
      showQrModal: false
    }),
    injected(),
    coinbaseWallet()
  ],
  transports: {
    [base.id]: http()
  },
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId
})

export {
  config,
  queryClient
}