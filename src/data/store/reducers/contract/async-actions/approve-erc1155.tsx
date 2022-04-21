import { Dispatch } from 'redux';
import * as actionsContract from '../actions';
import * as actionsCampaigns from 'data/store/reducers/campaigns/actions';
import { ContractActions } from '../types';
import { CampaignActions } from 'data/store/reducers/campaign/types';
import { CampaignsActions } from 'data/store/reducers/campaigns/types';
import { ethers } from 'ethers';
import { TTokenType } from 'types'
import { ERC1155Contract } from 'abi'
import * as newRetroDropDrops from 'data/store/reducers/campaign/actions';

export default async function approveERC1155(
	dispatch: Dispatch<ContractActions> & Dispatch<CampaignActions> & Dispatch<CampaignsActions>,
	provider: any,
	tokenAddress: string,
	userAddress: string,
	dropAddress: string,
	ipfsHash: string,
	title: string,
	address: string,
	chainId: number,
	description: string,
	logoURL: string,
	type: TTokenType,
	decimals: number | null,
	callback: () => void
) {
  dispatch(actionsContract.setLoading(true))
	try {

		const signer = await provider.getSigner()
		const contractInstance = await new ethers.Contract(tokenAddress, ERC1155Contract, signer)
		await contractInstance.setApprovalForAll(dropAddress, true)
		const checkReceipt = async function (): Promise<boolean> {
			return new Promise((resolve, reject) => {
				const interval = setInterval(async function () {
					const isApproved = await contractInstance.isApprovedForAll(userAddress, dropAddress)
					if (isApproved) {
						clearInterval(interval)
						resolve(true)
					}
				}, 3000)
			})
		}
		const approved = await checkReceipt()
		if (approved) {
			alert(`DONE: ${ipfsHash}`)
			// dispatch(actionsDrops.addNewRetroDrop({
			// 	title,
			// 	ipfsHash,
			// 	address,
			// 	chainId,
			// 	description,
			// 	logoURL,
			// 	status: 'active',
			// 	tokenAddress,
			// 	type,
			// 	decimals,
			// 	dropAddress
			// }))
			dispatch(newRetroDropDrops.clearNewRetroDrop())
			if (callback) { callback() }
		}
	} catch (err) {
		console.log({
			err
		})
	}
	
	dispatch(actionsContract.setLoading(false))
}
