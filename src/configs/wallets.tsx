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
    name: 'Trust Wallet',
    chains: ['1', '5', '137', '80001']
  },
  {
    id: 'coinbase_wallet',
    name: 'Coinbase Wallet',
    chains: ['1', '5', '137', '80001']
  },
  {
    id: 'imtoken',
    name: 'imToken',
    chains: ['1', '5', '137', '80001']
  },
  {
    id: 'zerion',
    name: 'Zerion',
    chains: ['1', '5', '137', '80001']
  }, {
    id: 'rainbow',
    name: 'Rainbow',
    chains: ['1', '5']
  }
]

export default wallets
