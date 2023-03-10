import axios from 'axios'

const authorizationApi = axios.create({
  baseURL: 'https://eth-mainnet.g.alchemy.com/v2/'
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
