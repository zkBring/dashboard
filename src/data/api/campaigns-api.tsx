import axios from 'axios'
const { REACT_APP_SERVER_URL } = process.env

const campaignsApi = axios.create({
  baseURL: REACT_APP_SERVER_URL
})

const requests = {
  create: (campaign: any) => campaignsApi.post('/linkdrop/campaigns', {
    campaign
  }, { withCredentials: true }),
  get: (creatorAddress: string) => campaignsApi.get(`/linkdrop/campaigns?creatorAddress=${creatorAddress}`, { withCredentials: true }),
  getOne: () => {},
  logout: () => {},
  saveLinks: () => {},
  getLinks: () => {}
}

export default requests
