import { TWallet } from 'types'

const wallets: TWallet[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    chains: ['1', '5', '137', '80001']
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    chains: ['1', '5', '137', '80001']
  },
  {
    id: 'trust',
    name: 'Trust',
    chains: ['1', '5', '137', '80001']
  },
  {
    id: 'coinbase_wallet',
    name: 'Coinbase Wallet',
    chains: ['1', '5', '137', '80001']
  },
  // {
  //   id: 'imtoken',
  //   name: 'imToken',
  //   chains: ['1', '5', '137', '80001']
  // },
  // {
  //   id: 'status',
  //   name: 'Status',
  //   chains: ['1', '5', '137', '80001']
  // }
]

export default wallets
