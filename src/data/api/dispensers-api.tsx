import axios from 'axios'
import { TDispenser, TDispenserLinks, TQRItem } from 'types'

const { REACT_APP_SERVER_URL } = process.env
const qrsSetApi = axios.create({
  baseURL: `${REACT_APP_SERVER_URL}/api/v2/dashboard`
})

const requests = {
  create: (dispenser: TDispenser) => {
    return qrsSetApi.post('/dispensers', dispenser, { withCredentials: true })
  },
  get: () => {
    return qrsSetApi.get('/dispensers', { withCredentials: true })
  },
  getOne: (id: string | number) => {
    return qrsSetApi.get(`/dispensers/${id}`, { withCredentials: true })
  },
  mapLinks: (id: string | number, links: TDispenserLinks, linksHasEqualContents: boolean) => {
    return qrsSetApi.post(`/dispensers/${id}/upload-links`, {
      encrypted_claim_links: links,
      preview_setting: linksHasEqualContents ? 'token' : 'stub'
    }, { withCredentials: true })
  },
  updateLinks: (id: string | number, links: TDispenserLinks, linksHasEqualContents: boolean) => {
    return qrsSetApi.put(`/dispensers/${id}/upload-links`, {
      encrypted_claim_links: links,
      preview_setting: linksHasEqualContents ? 'token' : 'stub'
    }, { withCredentials: true })
  },
  updateDispenserData: ({
    dispenser_id,
    title,
    claim_start,
    claim_duration
  }: {
    dispenser_id: string,
    title: string,
    claim_start: number,
    claim_duration: number
  }) => {
    return qrsSetApi.patch(`/dispensers/${dispenser_id}`, {
      title,
      claim_start,
      claim_duration
    }, { withCredentials: true })
  },
  updateStatus: ({
    dispenser_id,
    active
  }: {
    dispenser_id: string,
    active: boolean
  }) => {
    return qrsSetApi.patch(`/dispensers/${dispenser_id}/update-status`, {
      active
    }, { withCredentials: true })
  },
}

export default requests
