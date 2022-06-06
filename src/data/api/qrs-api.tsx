import axios from 'axios'
import { TQR, TQRStatus } from 'types'
import { ethers } from 'ethers'
const { REACT_APP_SERVER_URL } = process.env
const qrsSetApi = axios.create({
  baseURL: REACT_APP_SERVER_URL
})

const requests = {
  create: (qrSet: TQR) => {
    const qrArray = []
    for (let i = 0; i <= qrSet.qrQuantity; i++) {
      const newWallet = ethers.Wallet.createRandom()
      const { address: publicKey, privateKey } = newWallet
      const qr = {
        encryptedQrCode: privateKey,
        qrId: publicKey
      }
      qrArray.push(qr)
    }
    const data = {
      ...qrSet,
      device: 'M1',
      qrArray
    }
    return qrsSetApi.post('/QR/sets', data, { withCredentials: true })
  },
  updateStatus: (setId: number | string, newStatus: TQRStatus) => {
    return qrsSetApi.patch(`QR/sets/${setId}/update-status`, {
      status: newStatus
    }, { withCredentials: true })
  },
  get: (creatorAddress: string) => qrsSetApi.get(`/QR/sets?creatorAddress=${creatorAddress}`, { withCredentials: true }),
  getOne: (id: string) => qrsSetApi.get(`/QR/sets/${id}`, { withCredentials: true }),
  getQRs: (id: string) => qrsSetApi.get(`/QR/sets/${id}/QRs`, { withCredentials: true })
}

export default requests
