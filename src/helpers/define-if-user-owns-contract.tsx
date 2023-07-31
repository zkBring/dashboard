import { Alchemy } from 'alchemy-sdk'
import {
  defineAlchemyNetwork,
  getMinterRole
} from 'helpers'
import { ethers } from 'ethers'
import chains from 'configs/chains'
import { AdminRole } from 'abi'
const { REACT_APP_ALCHEMY_API_KEY } = process.env

type TDefineIfUserOwnsContract = (
  userAddress: string,
  tokenAddress: string,
  chainId: number,
  signer: any
) => Promise<
  boolean
>

const defineIfUserOwnsContract: TDefineIfUserOwnsContract = async (
  userAddress,
  tokenAddress,
  chainId,
  signer
) => {
  try {
    const chain = chains[chainId]
    if (chain.alchemySupport) {
      // if supported by alchemy
      const alchemy = new Alchemy({
        apiKey: REACT_APP_ALCHEMY_API_KEY,
        network: defineAlchemyNetwork(chainId)
      })
      const result = await alchemy.nft.verifyNftOwnership(userAddress, tokenAddress)
      if (result) {
        return true
      }
    } else {
      // if not supported by alchemy we assume that token is available for user
      return true
    }
    
    const minterRole = getMinterRole()
    const contractInstance = new ethers.Contract(tokenAddress, AdminRole.abi, signer)
    const adminRole = await contractInstance.getRoleAdmin(minterRole)
    const hasAdminRole = await contractInstance.hasRole(adminRole, userAddress)
    return hasAdminRole as boolean
  } catch (err) {
    console.log({
      err
    })
    return false
  }
}

export default defineIfUserOwnsContract