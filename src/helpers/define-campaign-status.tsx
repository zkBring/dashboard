import dropPlaceholder from 'images/drop-placeholder.png'
import { utils, ethers } from 'ethers'
import { LinkdropFactory, LinkdropMastercopy } from 'abi'

const defineCampaignStatus = async (
  contractAddress: string,
  provider: any
) => {
  const proxyContract = await new ethers.Contract(contractAddress, LinkdropMastercopy.abi, provider)
  const isPaused = await proxyContract.paused()
  return !isPaused
}
export default defineCampaignStatus