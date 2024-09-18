import { TNFTToken } from "types"

type TDefineIfUserOwnsTokenInArray = (
  nfts: TNFTToken[],
  id: string
) => TNFTToken | undefined

const defineIfUserOwnsTokenInArray: TDefineIfUserOwnsTokenInArray = (
  nfts,
  id
) => {
  const nftToken = nfts.find(nft => nft.tokenId === id)
  return nftToken
}

export default defineIfUserOwnsTokenInArray