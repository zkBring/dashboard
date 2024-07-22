import axios from 'axios'
import { AxiosResponse } from 'axios'

const {
  REACT_APP_SERVER_URL,
  REACT_APP_ZUPLO_API_KEY
} = process.env

const nonceApi = axios.create({
  baseURL: `${REACT_APP_SERVER_URL}/api/v2/nonce`,
  headers: {
    Authorization: `Bearer ${REACT_APP_ZUPLO_API_KEY as string}`
  }
})

type TRequest = {
  get: (user_address: string) => Promise<AxiosResponse<{ success: boolean, nonce: string }>>
}

const requests: TRequest = {
  get: (
    user_address
  ) => {
    return nonceApi.post(`/`, {
      user_address: user_address.toLowerCase()
    })
  }
}

export default requests
