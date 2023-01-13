import {  ethers } from 'ethers'
import { LinkdropMastercopy } from 'abi'

type TGetContractVersion = (
  proxyContractAddress: string,
  provider: any
) => Promise<string>

const getContractVersion: TGetContractVersion = async (
  proxyContractAddress,
  provider
) => {
  const proxyContract = await new ethers.Contract(proxyContractAddress, LinkdropMastercopy.abi, provider)
  return String(await proxyContract.version())

}
export default getContractVersion