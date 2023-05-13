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

const COINBASE_CONFIG = {
  walletApps: ['coinbase_wallet'],
  qrConfig: 'coinbase',
  qrDeeplink: 'https://go.cb-w.com/dapp?cb_url=%URL%'
}

export const addressSpecificOptions: TAddressConfig = {
  '0xe78f82c63f9237ce12c415afc547fa80e1575629': COINBASE_CONFIG,
  '0xf2b95635fc6cf3ebc8b5ca01c4e683a22b2e662c': COINBASE_CONFIG,
  '0xb4c3d57327d4fc9bcc3499963e21db1a5435d537': COINBASE_CONFIG,
  '0x3e12f31db4f1250e077171568263d0856d897428': COINBASE_CONFIG
}

export default addressSpecificOptions 