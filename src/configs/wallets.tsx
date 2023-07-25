import { TWallet } from 'types'

const wallets: TWallet[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    chains: ['1', '5', '137', '80001'],
    token_types: ['ERC1155', 'ERC20', 'ERC721']
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    chains: ['1', '5', '137', '80001'],
    token_types: ['ERC1155', 'ERC20', 'ERC721']
  },
  {
    id: 'trust',
    name: 'Trust Wallet',
    chains: ['1', '5', '137', '80001'],
    token_types: ['ERC1155', 'ERC20', 'ERC721']
  },
  {
    id: 'coinbase_wallet',
    name: 'Coinbase Wallet',
    chains: ['1', '5', '137', '80001'],
    token_types: ['ERC1155', 'ERC20', 'ERC721']
  },
  {
    id: 'imtoken',
    name: 'imToken',
    chains: ['1', '5', '137', '80001'],
    token_types: ['ERC1155', 'ERC20', 'ERC721']
  },
  {
    id: 'zerion',
    name: 'Zerion',
    chains: ['1', '5', '137', '80001'],
    token_types: ['ERC1155', 'ERC20', 'ERC721']
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    chains: ['1', '5'],
    token_types: ['ERC1155', 'ERC20', 'ERC721']
  },
  {
    id: 'manual_address',
    name: 'ENS or address',
    chains: ['1', '5', '137', '80001'],
    token_types: ['ERC1155', 'ERC20', 'ERC721']
  },
  {
    id: 'crossmint',
    name: 'Crossmint (Sign in with email)',
    chains: ['1', '5', '137', '80001'],
    token_types: ['ERC1155', 'ERC721']
  }
]

export default wallets
