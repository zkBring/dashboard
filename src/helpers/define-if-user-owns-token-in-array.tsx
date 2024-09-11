import { TNFTToken } from "types"

type TDefineIfUserOwnsTokenInArray = (
  nfts: TNFTToken[],
  id: string
) => boolean

const defineIfUserOwnsTokenInArray: TDefineIfUserOwnsTokenInArray = (
  nfts,
  id
) => {
  const nftToken = nfts.find(nft => nft.tokenId === id)
  return Boolean(nftToken)
}

export default defineIfUserOwnsTokenInArray