import axios from 'axios'
const { REACT_APP_SERVER_URL } = process.env

const authorizationApi = axios.create({
  baseURL: REACT_APP_SERVER_URL
})

const requests = {
  authorize: (
    msg: string,
    timestamp: number,
    sig: string,
    userAddress: string
  ) => authorizationApi.post('/auth', {
    sig,
    timestamp,
    userAddress,
    msg
  }, { withCredentials: true }),
  logout: () => {}
}

export default requests
