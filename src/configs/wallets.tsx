import { TWallet } from 'types'

const wallets: TWallet[] = [
  {
    id: 'coinbase_smart_wallet',
    name: 'Coinbase Smart Wallet',
    chains: ['1', '137', '8453', '13371'],
    token_types: ['ERC1155', 'ERC20', 'ERC721'],
    available_for_not_sponsored: true,
    available_for_client: ['coinbase']
  },
  {
    id: 'coinbase_wallet',
    name: 'Coinbase Mobile App (direct deeplink)',
    chains: ['1', '137', '8453', '13371'],
    token_types: ['ERC1155', 'ERC20', 'ERC721'],
    available_for_not_sponsored: true,
    available_for_client: ['coinbase']
  },
  {
    id: 'metamask',
    name: 'MetaMask',
    chains: ['1', '137', '8453', '13371'],
    token_types: ['ERC1155', 'ERC20', 'ERC721'],
    available_for_not_sponsored: true,
    available_for_client: []
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    chains: ['1', '137', '8453', '13371'],
    token_types: ['ERC1155', 'ERC20', 'ERC721'],
    available_for_not_sponsored: true,
    available_for_client: []
  },
  {
    id: 'trust',
    name: 'Trust Wallet',
    chains: ['1', '137', '8453', '13371'],
    token_types: ['ERC1155', 'ERC20', 'ERC721'],
    available_for_not_sponsored: true,
    available_for_client: []
  },
  {
    id: 'imtoken',
    name: 'imToken',
    chains: ['1', '137', '8453', '13371'],
    token_types: ['ERC1155', 'ERC20', 'ERC721'],
    available_for_not_sponsored: true,
    available_for_client: []
  },{
    id: 'wallet_1inch',
    name: '1inch',
    chains: ['1', '137', '8453', '13371'],
    token_types: ['ERC1155', 'ERC20', 'ERC721'],
    available_for_not_sponsored: true,
    available_for_client: []
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    chains: ['1'],
    token_types: ['ERC1155', 'ERC20', 'ERC721'],
    available_for_not_sponsored: true,
    available_for_client: []
  },
  {
    id: 'ledger',
    name: 'LedgerLive',
    chains: ['1', '137'],
    token_types: ['ERC1155', 'ERC721', 'ERC20'],
    available_for_not_sponsored: true,
    available_for_client: []
  }
]

export default wallets
