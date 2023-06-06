import { TFeatureName } from 'types'

type TAddressWalletConfig = string[]
type TAddressQRConfig = string
type TAddressQRDeeplinkConfig = string

type TAddressConfig = Record<
  string,
  {
    qrConfig?: TAddressQRConfig
    walletApps?: TAddressWalletConfig
    qrDeeplink?: TAddressQRDeeplinkConfig
    betaFeaturesAvailable?: TFeatureName[] 
  }
>

const COINBASE_CONFIG = {
  walletApps: ['coinbase_wallet'],
  qrConfig: 'coinbase',
  qrDeeplink: 'https://go.cb-w.com/dapp?cb_url=%URL%'
}

export const addressSpecificOptions: TAddressConfig = {
  '0xe78f82c63f9237ce12c415afc547fa80e1575629': COINBASE_CONFIG,
  '0xf2b95635fc6cf3ebc8b5ca01c4e683a22b2e662c': {
    ...COINBASE_CONFIG,
    betaFeaturesAvailable: ['dispenser']
  },
  '0xb4c3d57327d4fc9bcc3499963e21db1a5435d537': COINBASE_CONFIG,
  '0x3e12f31db4f1250e077171568263d0856d897428': {
    betaFeaturesAvailable: ['dispenser']
  },
  '0x0553ada5829184a7818dc866367d77334183603e': {
    betaFeaturesAvailable: ['dispenser']
  },
  '0x274e7610d931c7008373a70de780e68a010872c7': {
    betaFeaturesAvailable: ['dispenser']
  },
  '0x1dadf1f992ed2448baa284d0fca6a62536136612': {
    betaFeaturesAvailable: ['dispenser']
  },
  '0xe2f91e21c6689382c1c3dd8cd70633c39c911c4a': {
    betaFeaturesAvailable: ['dispenser']
  },
  '0xb7d98f28d9f7ef2732802c62bcac12c1b0d5edfb': {
    betaFeaturesAvailable: ['dispenser']
  }
}
