import axios from 'axios'
import { TDispenser, TDispenserLinks, TQRItem } from 'types'

const { REACT_APP_SERVER_URL } = process.env
const qrsSetApi = axios.create({
  baseURL: `${REACT_APP_SERVER_URL}/api/v2/dashboard`
})

const requests = {
  create: (qr_set: TDispenser) => {
    return qrsSetApi.post('/dispensers', qr_set, { withCredentials: true })
  },
  get: () => {
    return qrsSetApi.get('/dispensers', { withCredentials: true })
  },
  getOne: (id: string | number) => {
    return qrsSetApi.get(`/dispensers/${id}`, { withCredentials: true })
  },
  mapLinks: (id: string | number, links: TDispenserLinks) => {
    return qrsSetApi.post(`/dispensers/${id}/upload-links`, {
      encrypted_claim_links: links
    }, { withCredentials: true })
  }
}

export default requests
