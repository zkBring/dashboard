import axios from 'axios'
const { REACT_APP_SERVER_URL } = process.env

const authorizationApi = axios.create({
  baseURL: `${REACT_APP_SERVER_URL}/api/v1/dashboard`
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
    user_address: userAddress,
    msg
  }, { withCredentials: true }),
  logout: () => authorizationApi.post('/logout', {}, { withCredentials: true })
}

export default requests
