import { TFeatureName } from 'types'

type TAddressQRConfig = string
type TAddressQRDeeplinkConfig = string

type TAddressConfig = Record<
  string,
  {
    qrConfig?: TAddressQRConfig
    qrDeeplink?: TAddressQRDeeplinkConfig
    betaFeaturesAvailable?: TFeatureName[]
    claimAppUrl?: string
  }
>

const COINBASE_CONFIG = {
  qrConfig: 'coinbase',
  qrDeeplink: 'https://go.cb-w.com/dapp?cb_url=%URL%'
}

const ALPHEMY_CONFIG = {
  claimAppUrl: 'https://alphemy.linkdrop.io'
}

export const addressSpecificOptions: TAddressConfig = {
  '0xe78f82c63f9237ce12c415afc547fa80e1575629': COINBASE_CONFIG,
  '0x902b0bc91546a454bc70320dd9917f0def81c033': COINBASE_CONFIG,
  '0xd756da6e34522f534a811c96e5e3668b38a76a22': COINBASE_CONFIG,
  '0xf96f058d4197f0e8e8284ae4123b38e4701c93fd': COINBASE_CONFIG,
  '0xf2b95635fc6cf3ebc8b5ca01c4e683a22b2e662c': COINBASE_CONFIG,
  '0xf92f4c77ab90b6e0ee2ccb24fa176d151c5ba9d0': ALPHEMY_CONFIG,
  '0x241365e6eed258ac4a2824424b6802c0240e13eb': ALPHEMY_CONFIG,
  '0xb4c3d57327d4fc9bcc3499963e21db1a5435d537': ALPHEMY_CONFIG
}
