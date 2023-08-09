import axios from 'axios'
import { TDispenser, TDispenserLinks, TQRItem } from 'types'

const { REACT_APP_SERVER_URL } = process.env
const dispensersApi = axios.create({
  baseURL: `${REACT_APP_SERVER_URL}/api/v2/dashboard`
})

const requests = {
  create: (dispenser: TDispenser) => {
    return dispensersApi.post('/dispensers', dispenser, { withCredentials: true })
  },
  get: () => {
    return dispensersApi.get('/dispensers', { withCredentials: true })
  },
  getOne: (id: string | number) => {
    return dispensersApi.get(`/dispensers/${id}`, { withCredentials: true })
  },
  mapLinks: (id: string | number, links: TDispenserLinks, linksHasEqualContents: boolean) => {
    return dispensersApi.post(`/dispensers/${id}/upload-links`, {
      encrypted_claim_links: links,
      preview_setting: linksHasEqualContents ? 'token' : 'stub'
    }, { withCredentials: true })
  },
  updateLinks: (id: string | number, links: TDispenserLinks, linksHasEqualContents: boolean) => {
    return dispensersApi.put(`/dispensers/${id}/upload-links`, {
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
    return dispensersApi.patch(`/dispensers/${dispenser_id}`, {
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
    return dispensersApi.patch(`/dispensers/${dispenser_id}/update-status`, {
      active
    }, { withCredentials: true })
  },
  updateRedirectOn: ({
    dispenser_id,
    redirect_on
  }: {
    dispenser_id: string,
    redirect_on: boolean
  }) => {
    return dispensersApi.patch(`/dispensers/${dispenser_id}/redirect-on`, {
      redirect_on
    }, { withCredentials: true })
  },
  updateRedirectUrl: ({
    dispenser_id,
    redirect_url
  }: {
    dispenser_id: string,
    redirect_url: string
  }) => {
    return dispensersApi.patch(`/dispensers/${dispenser_id}/redirect-link`, {
      redirect_url
    }, { withCredentials: true })
  },
  getReport: (
    dispenser_id: string | number
  ) => {
    return dispensersApi.get(`/dispensers/${dispenser_id}/report`, { withCredentials: true })
  },
}

export default requests
