import axios from 'axios'
const { REACT_APP_IPFS_URL } = process.env

const pinataApi = axios.create({
  baseURL: REACT_APP_IPFS_URL
})

const requests = {
  get: (data) => pinataApi.post('/', data)
}

export default requests
