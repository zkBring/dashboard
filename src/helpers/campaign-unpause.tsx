import { utils, ethers } from 'ethers'
import {  LinkdropMastercopy } from 'abi'
import defineCampaignStatus from './define-campaign-status'

const campaignUnpause = async (
  contractAddress: string,
  account: string,
  provider: any
) => {
  let iface = new utils.Interface(LinkdropMastercopy.abi)
  const signer = await provider.getSigner()
  const gasPrice = await provider.getGasPrice()
  const oneGwei = ethers.utils.parseUnits('1', 'gwei')
  const data =  await iface.encodeFunctionData('unpause', [])
  const payload = { to: contractAddress, from: account, gasPrice: gasPrice.add(oneGwei), data }

  const transaction = await signer.sendTransaction(payload)

  const checkTransaction = async function (): Promise<string> {
    return new Promise((resolve, reject) => {
      const checkInterval = setInterval(async () => {
        try {
          const status = await defineCampaignStatus(contractAddress, provider)
          if (status === 'active') {
            clearInterval(checkInterval)
            resolve('active')
          }
        } catch (err) {
          console.log({ err })
        }
        
      }, 3000)
    })
  }
  return await checkTransaction()
  

}
export default campaignUnpause