import LedgerIcon from 'images/ledger-logo.png'
import LinkdropIcon from 'images/linkdrop-qr.png'
import CoinbaseIcon from 'images/coinbase-qr.png'
import { TQROption } from 'types'

type TQROptions = Record<string, TQROption>
const qrOptions: TQROptions = {
  'coinbase': {
    icon: CoinbaseIcon,
    cornersSquareOptions: {
      color: "#0C5EFF",
      type: 'extra-rounded'
    },
    cornersDotOptions: {
      color: "#0C5EFF",
      type: 'square'
    },
    dotsOptions: {
      color: "#9D9D9D",
      type: "dots"
    },
    backgroundOptions: {
      color: "#FFF"
    },
    imageOptions: {
      margin: 20,
      imageSize: 0.5,
      crossOrigin: 'anonymous',
    }
  },
  'ledger': {
    icon: LedgerIcon,
    cornersSquareOptions: {
      color: "#FFF",
      type: 'square'
    },
    cornersDotOptions: {
      color: "#FFF",
      type: 'square'
    },
    dotsOptions: {
      color: "#FFF",
      type: "dots"
    },
    backgroundOptions: {
      color: "#000",
    },
    imageOptions: {
      margin: 1,
      imageSize: 0.5,
      crossOrigin: 'anonymous',
    }
  },
  'linkdrop': {
    icon: LinkdropIcon,
    cornersSquareOptions: {
      color: "#0C5EFF",
      type: 'extra-rounded'
    },
    cornersDotOptions: {
      color: "#0C5EFF",
      type: 'square'
    },
    dotsOptions: {
      color: "#9D9D9D",
      type: "dots"
    },
    backgroundOptions: {
      color: "#FFF"
    },
    imageOptions: {
      margin: 20,
      imageSize: 0.5,
      crossOrigin: 'anonymous',
    }
  }
}

type TAddressConfig = Record<string, string>
export const addressQrOptions: TAddressConfig = {
  '0xe78f82c63f9237ce12c415afc547fa80e1575629': 'coinbase',
  '0xf2b95635fc6cf3ebc8b5ca01c4e683a22b2e662c': 'coinbase',
  '0xb4c3d57327d4fc9bcc3499963e21db1a5435d537': 'coinbase'
}

export const addressQRLinkPrefixOptions: TAddressConfig = {
  '0xe78f82c63f9237ce12c415afc547fa80e1575629': 'https://go.cb-w.com/dapp?cb_url=%URL%',
  '0xf2b95635fc6cf3ebc8b5ca01c4e683a22b2e662c': 'https://go.cb-w.com/dapp?cb_url=%URL%',
  '0xb4c3d57327d4fc9bcc3499963e21db1a5435d537': 'https://go.cb-w.com/dapp?cb_url=%URL%'
}

export default qrOptions 