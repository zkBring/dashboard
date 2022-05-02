import { Dispatch } from 'redux';
import * as actionsContract from '../actions';
import * as actionsDrops from 'data/store/reducers/campaigns/actions';
import * as newRetroDropDrops from 'data/store/reducers/campaign/actions';
import { ContractActions } from '../types';
import { CampaignActions } from 'data/store/reducers/campaign/types';
import { CampaignsActions } from 'data/store/reducers/campaigns/types';
import { ethers } from 'ethers';
import { TTokenType } from 'types'
import { ERC20Contract } from 'abi'

export default async function approveERC20(
	dispatch: Dispatch<ContractActions> & Dispatch<CampaignActions> & Dispatch<CampaignsActions>,
	provider: any,
	tokenAddress: string,
	userAddress: string,
	chainId: number,
	decimals: number | null,
	callback: () => void
) {
  dispatch(actionsContract.setLoading(true))
	try {
		const signer = await provider.getSigner()
		// const gasPrice = await provider.getGasPrice()
		// const oneGwei = ethers.utils.parseUnits('1', 'gwei')
		// const tokenAmount = 1
		// const contractInstance = await new ethers.Contract(tokenAddress, ERC20Contract, signer)
		// const iface = new ethers.utils.Interface(ERC20Contract);
		// const data = await iface.encodeFunctionData('approve', [
		// 	proxyAddress,
		// 	String(amountFormatted)
		// ])
		// await signer.sendTransaction({
		// 	to: tokenAddress,
		// 	gasPrice: gasPrice.add(oneGwei),
		// 	from: userAddress,
		// 	value: 0,
		// 	data: data
		// })

		// const transaction = async function (): Promise<boolean> {
		// 	return new Promise((resolve, reject) => {
		// 		// const checkInterval = setInterval(async () => {
		// 		// 	const allowed = await contractInstance.allowance(userAddress, dropAddress)
					
		// 		// }, 3000)
		// 	})
		// }
		// const finished = await transaction()
		// if (finished) {
		// 	dispatch(newRetroDropDrops.clearCampaign())
		// 	if (callback) { callback() }
		// }
	} catch (err) {
		console.log({
			err
		})
	}
  
	
	dispatch(actionsContract.setLoading(false))
}
