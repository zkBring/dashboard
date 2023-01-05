import axios from 'axios'
import { metadataUrlResolve } from 'helpers'

const getERC1155AssetData = (metadataUrl: string, tokenId: string) => {
  const finalUrl = metadataUrl.replace('0x{id}', tokenId)
  return axios.get(metadataUrlResolve(finalUrl, tokenId))
}

export default getERC1155AssetData
