import { TWallet } from 'types'

const wallets: TWallet[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    chains: ['1', '3', '4', '5', '42', '100', '137']
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    chains: ['1', '3', '4', '5', '42', '100', '137']
  },
  {
    id: 'status',
    name: 'Status',
    chains: ['1', '3', '4', '5', '42', '100', '137']
  },
  {
    id: 'opera',
    name: 'Opera',
    chains: ['1', '3', '4', '5', '42', '100', '137']
  },
  {
    id: 'coinbase_wallet',
    name: 'Coinbase Wallet',
    chains: ['1', '3', '4', '5', '42', '100', '137']
  },
  {
    id: 'imtoken',
    name: 'imToken',
    chains: ['1', '3', '4', '5', '42', '100', '137']
  }
]


export default wallets
