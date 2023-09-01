import { Alchemy } from 'alchemy-sdk'
import {
  defineAlchemyNetwork,
  getMinterRole
} from 'helpers'
import { ethers } from 'ethers'
import chains from 'configs/chains'
import { AdminRole } from 'abi'
import { getMnemonicCollections } from 'data/api'
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
    if (chain.alchemySupport ) {
      const network = defineAlchemyNetwork(chainId)
      if (network) {
        // if supported by alchemy
        const alchemy = new Alchemy({
          apiKey: REACT_APP_ALCHEMY_API_KEY,
          network
        })
        const result = await alchemy.nft.verifyNftOwnership(userAddress, tokenAddress)
        if (result) {
          return true
        }
      }
    } else if (chain.mnemonicSupport) {
      console.log('here0')
      const response = await getMnemonicCollections(
        chainId,
        userAddress,
        500,
        tokenAddress
      )
      if (response) {
        const { data: { nfts } } = response
        if (nfts.length > 0) {
          return true
        }
      }
    } else {
      // if not supported by alchemy and mnemonic we assume that token is available for user
      return true
    }
    console.log('here')
    const minterRole = getMinterRole()
    console.log('here1')

    const contractInstance = new ethers.Contract(tokenAddress, AdminRole.abi, signer)
    console.log('here2')

    const adminRole = await contractInstance.getRoleAdmin(minterRole)
    console.log('here3')

    const hasAdminRole = await contractInstance.hasRole(adminRole, userAddress)
    console.log('here4')

    return hasAdminRole as boolean
  } catch (err) {
    console.log({
      err
    })
    return false
  }
}

export default defineIfUserOwnsContract