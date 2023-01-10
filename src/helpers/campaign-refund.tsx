import { utils, ethers } from 'ethers'
import {  LinkdropMastercopy } from 'abi'
import defineCampaignStatus from './define-campaign-status'

const campaignRefund = async (
  contractAddress: string,
  account: string,
  provider: any
) => {
  try {
    let iface = new utils.Interface(LinkdropMastercopy.abi)
    const signer = await provider.getSigner()
    const gasPrice = await provider.getGasPrice()
    const oneGwei = ethers.utils.parseUnits('1', 'gwei')
    const data =  await iface.encodeFunctionData('withdraw', [])
    const payload = { to: contractAddress, from: account, gasPrice: gasPrice.add(oneGwei), data }

    const transaction = await signer.sendTransaction(payload)

  // const checkTransaction = async function (): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     const checkInterval = setInterval(async () => {
  //       try {
  //         const status = await defineCampaignStatus(contractAddress, provider)
  //         if (status) {
  //           clearInterval(checkInterval)
  //           resolve(status)
  //         }
  //       } catch (err) {
  //         console.log({ err })
  //       }
        
  //     }, 3000)
  //   })
  // }
  // return await checkTransaction()
  } catch (e) {
    console.error(e)
  }

}
export default campaignRefund