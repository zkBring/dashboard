import axios from 'axios'
const { REACT_APP_SERVER_URL } = process.env

const campaignsApi = axios.create({
  baseURL: REACT_APP_SERVER_URL
})

const requests = {
  create: (campaign: any) => campaignsApi.post('/dashboard/linkdrop/campaigns', {
    campaign
  }),
  get: () => {},
  getOne: () => {},
  logout: () => {},
  saveLinks: () => {},
  getLinks: () => {}
}

export default requests
