import { Dispatch } from 'redux';
import * as actionsContract from '../actions';
import * as actionsNewRetroDrop from 'data/store/reducers/campaign/actions';
import { ContractActions } from '../types';
import { CampaignActions } from 'data/store/reducers/campaign/types';
import { ethers } from 'ethers';
import { TTokenType, IMetamaskError } from 'types'
import contracts from 'configs/contracts'
import { DropFactoryInterface } from '@drop-protocol/drop-sdk'
import { hexlifyIpfsHash } from 'helpers'

const DECEMBER_31_2325 = 11234234223 // Thursday, December 31, 2325 8:37:03 PM

export default async function createDrop(
	dispatch: Dispatch<ContractActions> & Dispatch<CampaignActions>,
	provider: any,
	tokenAddress: string,
	ipfsHash: string,
	chainId: number,
	type: TTokenType,
	callback: () => void
) {
	dispatch(actionsContract.setLoading(true))
	try {
		// const contractData = contracts[chainId]
		// const factoryAddress = contractData.factory
		// const templateAddress = contractData[type]
		// console.log({
		// 	contractData,
		// 	factoryAddress,
		// 	templateAddress
		// })
		// let drop = await deployContract(provider, merkleTree, tokenAddress, ipfsHash, factoryAddress, templateAddress)
		// dispatch(actionsNewRetroDrop.setDropAddress(drop))
		// dispatch(actionsContract.setLoading(false))
		
	} catch (err) {
		const error = err as IMetamaskError;
		if (error.code === 4001) {
			return dispatch(actionsContract.setLoading(false))
		}
		dispatch(actionsContract.setLoading(false))
	}
  
	
	callback()
}


const deployContract = async (
	provider: any,
	tokenAddress: string,
	ipfsHash: string,
	factoryAddress: string,
	templateAddress: string
) => {
	const signer = await provider.getSigner()
	const proxyContract = await new ethers.Contract(factoryAddress, DropFactoryInterface, signer)
	const ipfsHexlified = hexlifyIpfsHash(ipfsHash)
	// await proxyContract.createDrop(
	// 	templateAddress,
	// 	tokenAddress,
	// 	merkleTree.merkleRoot,
	// 	DECEMBER_31_2325,
	// 	ipfsHexlified
	// )
	
	// const checkReceipt = async function (): Promise<string> {
	// 	return new Promise((resolve, reject) => {
	// 		proxyContract.on("CreateDrop", (
	// 			drop: string,
	// 			token: string,
	// 			template: string,
	// 			expiration: any,
	// 			ipfs: string,
	// 			event
	// 		) => { 
	// 			if (ipfsHexlified === ipfs) {
	// 				resolve(drop)
	// 			}
	// 		})
	// 	})
	// }
	// return await checkReceipt()
	 
}