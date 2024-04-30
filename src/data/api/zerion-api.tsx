import axios, { AxiosResponse } from 'axios'
import { TZerionERC20Item, TZerionNetworkItem } from 'types'
import { createQueryString } from 'helpers'
const { REACT_APP_ZERION_API_KEY } = process.env

type TGetZerionERC20Item = (
  address: string,
  currentNetworkName: string
) => Promise<AxiosResponse<{
  data: TZerionERC20Item[]
}>>

type TGetZerionNetworks = () => Promise<AxiosResponse<{
  data: TZerionNetworkItem[]
}>>

const getERC20Item: TGetZerionERC20Item = (
  address: string,
  currentNetworkName: string
) => {
  const query = createQueryString({
    'filter[chain_ids]': currentNetworkName,
    'filter[trash]': 'only_non_trash'
  })
  return axios.get(
    `https://api.zerion.io/v1/wallets/${address}/positions/?${query}`, {
      headers: {
        accept: 'application/json',
        authorization: `Basic ${btoa(REACT_APP_ZERION_API_KEY as string)}`
      }
    })
}


const getNetworks: TGetZerionNetworks = () => axios.get(
  `https://api.zerion.io/v1/chains/`, {
    headers: {
      accept: 'application/json',
      authorization: `Basic ${btoa(REACT_APP_ZERION_API_KEY as string)}`
    }
  }
)

export default {
  getERC20Item,
  getNetworks
}