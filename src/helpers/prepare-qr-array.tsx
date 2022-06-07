import { ethers } from 'ethers'
import { TQRItem }  from 'types'

const prepareQRArray = (quantity: number) => {
  const qrArray: TQRItem[] = []
  for (let i = 0; i <= quantity; i++) {
    const newWallet = ethers.Wallet.createRandom()
    const { address: publicKey, privateKey } = newWallet
    const qr = {
      encrypted_qr_secret: privateKey,
      qr_id: publicKey
    }
    qrArray.push(qr)
  }
  return qrArray
}

export default prepareQRArray
