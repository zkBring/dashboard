import axios, { AxiosResponse } from 'axios'
import { TMnemonicContract } from 'types'
import { defineMnemonicApiURL } from 'helpers'
const { REACT_APP_MNEMONIC_API_KEY } = process.env

type TGetCollectionResponse = {
  nfts: TMnemonicContract[]
}
type TGetCollection = (
  chainId: number,
  address: string
) => (Promise<AxiosResponse<TGetCollectionResponse>> | undefined)

const getMnemonicCollections:TGetCollection = (
  chainId,
  address
) => {
  const apiURL = defineMnemonicApiURL(chainId)
  return axios.get(`${apiURL}/foundational/v1beta2/nfts/by_owner/${address}?limit=500`, {
    headers: {
      'X-API-Key': REACT_APP_MNEMONIC_API_KEY as string
    }
  })
}

export default getMnemonicCollections
