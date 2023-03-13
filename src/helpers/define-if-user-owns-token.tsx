import { TTokenType } from "types"
import { ethers } from 'ethers'
import { ERC20Contract, ERC721Contract, ERC1155Contract } from 'abi'

type TDefineIfUserOwnsToken = (userAddress: string, tokenType: TTokenType, tokenAddress: string, provider: any, tokenId: string) => Promise<{ owns: boolean, balance: string }>

const defineIfUserOwnsToken: TDefineIfUserOwnsToken = async (userAddress, tokenType, tokenAddress, provider, tokenId) => {
  try {
    const signer = await provider.getSigner()
    if (tokenType === 'ERC721') {
      const contractInstance = new ethers.Contract(tokenAddress, ERC721Contract.abi, signer)
      const owner = await contractInstance.ownerOf(tokenId)
      return {
        owns: owner.toLowerCase() === userAddress.toLocaleLowerCase(),
        balance: '1'
      }
    }
    return {
      owns: true,
      balance: '1'
    }
  } catch (err) {
    console.log({
      err
    })
    return {
      owns: false,
      balance: '0'
    }
  }
  
}

export default defineIfUserOwnsToken