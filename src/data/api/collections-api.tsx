import axios from 'axios'
import { TCollection, TCollectionToken } from 'types'

const { REACT_APP_SERVER_URL } = process.env
const collectionsApi = axios.create({
  baseURL: `${REACT_APP_SERVER_URL}/api/v2/dashboard`
})

const requests = {
  create: (collection: TCollection) => {
    return collectionsApi.post('/collections', collection, { withCredentials: true })
  },
  get: () => {
    return collectionsApi.get('/collections', { withCredentials: true })
  },
  getOne: (collection_id: string | number) => {
    return collectionsApi.get(`/collections/${collection_id}`, { withCredentials: true })
  },
  addToken: (collection_id: string | number, token: TCollectionToken) => {
    return collectionsApi.post(`/collections/${collection_id}/token`, token, { withCredentials: true })
  }
}

export default requests
