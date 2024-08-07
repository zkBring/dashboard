import axios, { AxiosResponse } from 'axios'
import { TQRManagerItem } from 'types'

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

type TRequests = {
  get: () => Promise<AxiosResponse<{
    success: boolean,
    items: TQRManagerItem[]
  }>>
}

const requests: TRequests = {
  get: () => {
    return qrsSetApi.get('/qr-manager', { withCredentials: true })
  }
}

export default requests
