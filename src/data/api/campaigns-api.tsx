import axios from 'axios'
const { REACT_APP_SERVER_URL } = process.env

const campaignsApi = axios.create({
  baseURL: REACT_APP_SERVER_URL
})

const requests = {
  create: (campaign: any) => campaignsApi.post('/linkdrop/campaigns', {
    campaign
  }, { withCredentials: true }),
  get: (creator_address: string) => campaignsApi.get(`/linkdrop/campaigns?creator_address=${creator_address}`, { withCredentials: true }),
  getOne: () => {},
  logout: () => {},
  saveLinks: () => {},
  getLinks: () => {}
}

export default requests
