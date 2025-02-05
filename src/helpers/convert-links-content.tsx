import { TLinkContent, TAssetsData, TClaimPattern } from 'types'
import { utils } from 'ethers'

type TConvertLinksContent = (
  linksContents: TLinkContent[],
  decimals: number,
  claimPattern: TClaimPattern
) => TAssetsData

const convertLinksContent: TConvertLinksContent = (linksContents, decimals) => {
  let result: TAssetsData = []
  linksContents.forEach((item: TLinkContent) => { 
    const amountOfLinks = Number(item.linksAmount)
    for (let i = 0; i < amountOfLinks; i++) {
      result.push({
        amount: String(utils.parseUnits(String(item.tokenAmount), decimals)),
        original_amount: item.tokenAmount
      })
    }
  })
  return result
}

export default convertLinksContent
