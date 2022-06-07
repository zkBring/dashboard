import axios from 'axios'
import { TQRSet, TQRStatus, TQRItem } from 'types'

const { REACT_APP_SERVER_URL } = process.env
const qrsSetApi = axios.create({
  baseURL: REACT_APP_SERVER_URL
})

const requests = {
  create: (qr_set: TQRSet) => {
    return qrsSetApi.post('/QR/sets', qr_set, { withCredentials: true })
  },
  updateStatus: (setId: number | string, newStatus: TQRStatus) => {
    return qrsSetApi.patch(`QR/sets/${setId}/update-status`, {
      status: newStatus
    }, { withCredentials: true })
  },
  get: (creator_address: string) => {
    return qrsSetApi.get(`/QR/sets?creator_address=${creator_address}`, { withCredentials: true })
  },
  getOne: (id: string) => {
    return qrsSetApi.get(`/QR/sets/${id}`, { withCredentials: true })
  },
  getQRs: (id: string) => {
    return qrsSetApi.get(`/QR/sets/${id}/QRs`, { withCredentials: true })
  },
  mapLinks: (id: string, qrs: TQRItem[]) => {
    return qrsSetApi.post(`/QR/sets/${id}/map-links`, { withCredentials: true })
  }
}

export default requests
