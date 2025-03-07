import { ethers } from 'ethers'
import { ERC20Contract } from 'abi'

const getBringAmount = async (
  userAddress: string,
  signer: any
) => {
  try {
    const contractInstance = new ethers.Contract('0x02E739740B007bd5E4600b9736A143b6E794D223', ERC20Contract.abi, signer)
    const tokenAmount = await contractInstance.balanceOf(userAddress)
    const tokenDecimals = await contractInstance.decimals()
    return {
      tokenAmount,
      tokenDecimals
    }
  } catch (err) {
    console.log({
      err
    })
    return null
  }

}

export default getBringAmount
