import { TMnemonicContract, TNFTToken, TTokenType } from 'types'

type TConvertMnemonicNFTs = (mnemonicTokens: TMnemonicContract[], tokenAddress: string) => TNFTToken[]

const convertMnemonicNFTs:TConvertMnemonicNFTs = (
  mnemonicTokens,
  tokenAddress
) => {
  const result = mnemonicTokens.reduce<TNFTToken[]>((sum, item) => {
    const {
      quantity,
      nft: {
        tokenId,
        contractAddress,
        type,
        collection: {
          name
        },
        metadata: {
          image: {
            uri
          }
        }
      }
    } = item
    if (contractAddress.toLowerCase() !== tokenAddress.toLowerCase()) { return sum }
    sum.push({
      title: name,
      tokenId,
      tokenType: type.replace('TYPE_', '') as TTokenType,
      balance: quantity,
      media: [{
        gateway: uri
      }]
    })
    return sum
  }, [])
  return result
}

export default convertMnemonicNFTs