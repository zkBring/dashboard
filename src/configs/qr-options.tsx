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

export default qrOptions 