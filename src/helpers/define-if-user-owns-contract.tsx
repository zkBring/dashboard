import { Alchemy } from 'alchemy-sdk'
import { defineAlchemyNetwork } from 'helpers'
const { REACT_APP_ALCHEMY_API_KEY } = process.env

type TDefineIfUserOwnsContract = (userAddress: string, tokenAddress: string, chainId: number) => Promise<boolean>

const defineIfUserOwnsContract: TDefineIfUserOwnsContract = async (userAddress, tokenAddress, chainId) => {
  try {
    const alchemy = new Alchemy({
      apiKey: REACT_APP_ALCHEMY_API_KEY,
      network: defineAlchemyNetwork(chainId)
    })
    return await alchemy.nft.verifyNftOwnership(userAddress, tokenAddress)
  } catch (err) {
    console.log({
      err
    })
    return false
  }
}

export default defineIfUserOwnsContract