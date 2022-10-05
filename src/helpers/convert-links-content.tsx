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
    const amountOfLinks = Number(item.linksAmount)
    for (let i = 0; i <= amountOfLinks; i++) {
      result.push({
        amount: String(utils.parseUnits(String(item.tokenAmount), decimals)),
        id: item.tokenId,
        native_tokens_amount: '0',
        original_native_tokens_amount: '0',
        original_amount: item.tokenAmount
      })
    }
  })
  return result
}

export default convertLinksContent