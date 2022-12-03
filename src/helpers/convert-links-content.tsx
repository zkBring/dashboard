import { TLinkContent, TAssetsData } from 'types'
import { utils } from 'ethers'

// export type TAsset = {
//   amount?: string,
//   id?: number | string,
//   native_tokens_amount?: string,
//   original_amount?: string,
//   original_native_tokens_amount?: string
// }

type TConvertLinksContent = (linksContents: TLinkContent[], decimals: number) => TAssetsData
const convertLinksContent: TConvertLinksContent = (linksContents, decimals) => {
  const result: TAssetsData = []
  linksContents.forEach((item: TLinkContent) => {
    if (item.tokenType === 'ERC1155') {
      const amountOfLinks = Number(item.linksAmount)
      for (let i = 0; i < amountOfLinks; i++) {
        result.push({
          amount: String(utils.parseUnits(String(item.tokenAmount), decimals)),
          id: item.tokenId,
          original_amount: item.tokenAmount
        })
      }
    } else if (item.tokenType === 'ERC721') {
      if (item.tokenId && item.tokenId.includes('-')) {
        const tokenIds = item.tokenId.split('-').map(item => item.trim())
        for (
          let i = Number(tokenIds[0]);
          i <= Number(tokenIds[1]);
          i++
        ) {
          result.push({
            id: String(i)
          })
        }
      } else {
        result.push({
          id: item.tokenId
        })
      }
    } else {
      const amountOfLinks = Number(item.linksAmount)
      for (let i = 0; i < amountOfLinks; i++) {
        result.push({
          amount: String(utils.parseUnits(String(item.tokenAmount), decimals)),
          original_amount: item.tokenAmount
        })
      }
    }
  })
  console.log({ result })
  return result
}

export default convertLinksContent