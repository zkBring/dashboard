import { TWallet } from 'types'

const wallets: TWallet[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    chains: ['1', '5', '137', '80001', '8453', '84531'],
    token_types: ['ERC1155', 'ERC20', 'ERC721'],
    available_for_not_sponsored: true
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    chains: ['1', '5', '137', '80001', '8453', '84531'],
    token_types: ['ERC1155', 'ERC20', 'ERC721'],
    available_for_not_sponsored: true
  },
  {
    id: 'trust',
    name: 'Trust Wallet',
    chains: ['1', '5', '137', '80001', '8453', '84531'],
    token_types: ['ERC1155', 'ERC20', 'ERC721'],
    available_for_not_sponsored: true
  },
  {
    id: 'coinbase_wallet',
    name: 'Coinbase Wallet',
    chains: ['1', '5', '137', '80001', '8453', '84531'],
    token_types: ['ERC1155', 'ERC20', 'ERC721'],
    available_for_not_sponsored: true
  },
  {
    id: 'imtoken',
    name: 'imToken',
    chains: ['1', '5', '137', '80001', '8453', '84531'],
    token_types: ['ERC1155', 'ERC20', 'ERC721'],
    available_for_not_sponsored: true
  },
  {
    id: 'zerion',
    name: 'Zerion',
    chains: ['1', '5', '137', '80001', '8453', '84531'],
    token_types: ['ERC1155', 'ERC20', 'ERC721'],
    available_for_not_sponsored: true
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    chains: ['1', '5'],
    token_types: ['ERC1155', 'ERC20', 'ERC721'],
    available_for_not_sponsored: true
  },
  {
    id: 'manual_address',
    name: 'ENS or address',
    chains: ['1', '5', '137', '80001', '8453', '84531'],
    token_types: ['ERC1155', 'ERC20', 'ERC721'],
    available_for_not_sponsored: false
  },
  {
    id: 'crossmint',
    name: 'Crossmint (Sign in with email)',
    chains: ['1', '5', '137', '80001', '8453', '84531'],
    token_types: ['ERC1155', 'ERC721'],
    available_for_not_sponsored: false
  },
  {
    id: 'ledger',
    name: 'LedgerLive',
    chains: ['1', '137'],
    token_types: ['ERC1155', 'ERC721', 'ERC20'],
    available_for_not_sponsored: false
  }
]

export default wallets
