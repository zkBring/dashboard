import TTokenType from "./token-type"

type TMnemonicContract = {
  nft: {
    contractAddress:string
    tokenId:string
    type: `TYPE_${TTokenType}`,
    metadata:{
      metadataUri:{
        uri:string
        mimeType: string
      },
      name:string
      description: string
      image: {
        uri: string
        uriOriginal: string
        mimeType: string
      }
    },
    collection:{
      name: string
    }
  },
  quantity: string
}

export default TMnemonicContract
