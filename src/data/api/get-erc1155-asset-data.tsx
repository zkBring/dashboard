import axios from 'axios'

const getERC1155AssetData = (metadataUrl: string, tokenId: string) => {
  const finalUrl = metadataUrl.replace('0x{id}', tokenId)
  return axios.get(finalUrl)
}

export default getERC1155AssetData
