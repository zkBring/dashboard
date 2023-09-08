import axios, { AxiosResponse } from 'axios'
import { TMnemonicContract } from 'types'
import { defineMnemonicApiURL } from 'helpers'
const { REACT_APP_MNEMONIC_API_KEY } = process.env

type TGetCollectionResponse = {
  nfts: TMnemonicContract[]
}
type TGetCollection = (
  chainId: number,
  address: string,
  limit?: number,
  contractAddress?: string,
) => (Promise<AxiosResponse<TGetCollectionResponse>> | undefined)

const getMnemonicCollections:TGetCollection = (
  chainId,
  address,
  limit = 500,
  contractAddress
) => {
  const apiURL = defineMnemonicApiURL(chainId)
  const queryVariables: Record<string, string | number> = {}
  if (limit) {
    queryVariables.limit = limit
  }
  if (contractAddress) {
    queryVariables.contractAddress = contractAddress
  }
  const queryVariablesAsString = Object.entries(queryVariables).map(queryVariable => `${queryVariable[0]}=${queryVariable[1]}`).join('&')
  return axios.get(`${apiURL}/foundational/v1beta2/nfts/by_owner/${address}?${queryVariablesAsString}`, {
    headers: {
      'X-API-Key': REACT_APP_MNEMONIC_API_KEY as string
    }
  })
}

export default getMnemonicCollections
