import axios from 'axios'
const { REACT_APP_SERVER_URL } = process.env

const authorizationApi = axios.create({
  baseURL: REACT_APP_SERVER_URL
})

const requests = {
  authorize: (
    signature: string,
    timestamp: string,
    userAddress: string
  ) => authorizationApi.post('/auth', {
    signature,
    timestamp,
    userAddress
  }),
  logout: () => {}
}

export default requests
