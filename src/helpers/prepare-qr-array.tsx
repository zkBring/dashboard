import * as wccrypto from '@walletconnect/utils/dist/esm'
import { TQRItem }  from 'types'
import { encrypt } from 'lib/crypto'

const prepareQRArray = (
  quantity: number,
  dashboard_key: string
) => {
  const qrArray: TQRItem[] = []
  for (let i = 0; i < quantity; i++) {
    const newWallet = wccrypto.generateKeyPair()
    const { publicKey, privateKey } = newWallet
    const qr = {
      encrypted_qr_secret: encrypt(privateKey, dashboard_key),
      qr_id: publicKey
    }
    qrArray.push(qr)
  }
  return qrArray
}

export default prepareQRArray
