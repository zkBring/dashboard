import axios from 'axios'
import { TQRSet, TQRStatus, TQRItem } from 'types'

const {
  REACT_APP_SERVER_URL,
  REACT_APP_ZUPLO_API_KEY
} = process.env

const qrsSetApi = axios.create({
  baseURL: `${REACT_APP_SERVER_URL}/api/v2/dashboard`,
  headers: {
    Authorization: `Bearer ${REACT_APP_ZUPLO_API_KEY as string}`
  }
})

const requests = {
  create: (qr_set: TQRSet) => {
    return qrsSetApi.post('/QR/sets', qr_set, { withCredentials: true })
  },
  updateStatus: (set_id: number | string, newStatus: TQRStatus) => {
    return qrsSetApi.patch(`QR/sets/${set_id}/update-status`, {
      status: newStatus
    }, { withCredentials: true })
  },
  updateQuantity: (
      set_id: number | string,
      qr_array: TQRItem[],
      qr_quantity: number
    ) => {
    return qrsSetApi.patch(`QR/sets/${set_id}/update-quantity`, {
      qr_array,
      qr_quantity
    }, { withCredentials: true })
  },
  get: () => {
    return qrsSetApi.get('/QR/sets', { withCredentials: true })
  },
  getOne: (id: string | number) => {
    return qrsSetApi.get(`/QR/sets/${id}`, { withCredentials: true })
  },
  getQRs: (id: string | number) => {
    return qrsSetApi.get(`/QR/sets/${id}/QRs`, { withCredentials: true })
  },
  mapLinks: (id: string | number, qrs: TQRItem[]) => {
    return qrsSetApi.patch(`/QR/sets/${id}/map-links`, {
      mapping: qrs
    }, { withCredentials: true })
  }
}

export default requests
