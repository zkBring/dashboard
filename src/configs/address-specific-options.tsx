type TAddressWalletConfig = string[]
type TAddressQRConfig = string
type TAddressQRDeeplinkConfig = string

type TAddressConfig = Record<
  string,
  {
    qrConfig?: TAddressQRConfig
    walletApps?: TAddressWalletConfig
    qrDeeplink?: TAddressQRDeeplinkConfig
  }
>

export const addressSpecificOptions: TAddressConfig = {
  '0xe78f82c63f9237ce12c415afc547fa80e1575629': {
    walletApps: ['coinbase_wallet'],
    qrConfig: 'coinbase',
    qrDeeplink: 'https://go.cb-w.com/dapp?cb_url=%URL%'
  },
  '0xf2b95635fc6cf3ebc8b5ca01c4e683a22b2e662c': {
    walletApps: ['coinbase_wallet'],
    qrConfig: 'coinbase',
    qrDeeplink: 'https://go.cb-w.com/dapp?cb_url=%URL%'
  },
  '0xb4c3d57327d4fc9bcc3499963e21db1a5435d537': {
    walletApps: ['coinbase_wallet'],
    qrConfig: 'coinbase',
    qrDeeplink: 'https://go.cb-w.com/dapp?cb_url=%URL%'
  }
}

export default addressSpecificOptions 