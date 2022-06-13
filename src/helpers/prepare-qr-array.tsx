import * as wccrypto from '@walletconnect/utils/dist/esm'
import { TQRItem }  from 'types'

const prepareQRArray = (quantity: number) => {
  const qrArray: TQRItem[] = []
  for (let i = 0; i < quantity; i++) {
    const newWallet = wccrypto.generateKeyPair()
    const { publicKey, privateKey } = newWallet
    const qr = {
      encrypted_qr_secret: privateKey,
      qr_id: publicKey
    }
    qrArray.push(qr)
  }
  return qrArray
}

export default prepareQRArray
