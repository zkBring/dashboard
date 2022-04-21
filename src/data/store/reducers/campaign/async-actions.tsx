import { Dispatch } from 'redux';
import * as actionsNewRetroDrop from './actions';
import { CampaignActions } from './types';
import { TTokenType } from 'types'
import { pinataApi } from 'data/api'
import { ERC20Contract } from 'abi'
import { ethers } from 'ethers';
type TIPFSResponse = { data: { IpfsHash: string, PinSize: number, Timestamp: string } }

export async function createIPFS(dispatch: Dispatch<CampaignActions>, data: any, title: string, description: string, logoURL: string, tokenAddress: string, chainId: number, type: TTokenType, callback: () => void) {
  dispatch(actionsNewRetroDrop.setLoading(true))
  const response: TIPFSResponse = await createIpfs(data, title, description, logoURL, tokenAddress, chainId, type)
  dispatch(actionsNewRetroDrop.setIPFS(response.data.IpfsHash))
  dispatch(actionsNewRetroDrop.setTitle(title))
  dispatch(actionsNewRetroDrop.setLogoURL(logoURL))
  dispatch(actionsNewRetroDrop.setDescription(description))
  dispatch(actionsNewRetroDrop.setTitle(title))
  dispatch(actionsNewRetroDrop.setLoading(false))
  callback()
}

export async function setTokenContractData(dispatch: Dispatch<CampaignActions>, tokenAddress: string, provider: any, type: TTokenType, callback: () => void) {
  try {
    dispatch(actionsNewRetroDrop.setLoading(true))
    dispatch(actionsNewRetroDrop.setTokenAddress(tokenAddress))
    const signer = await provider.getSigner()
    if (type === 'erc20') {
      const contractInstance = await new ethers.Contract(tokenAddress, ERC20Contract, signer)
      const decimals = await contractInstance.decimals()
      dispatch(actionsNewRetroDrop.setDecimals(decimals))
    }
    if (type === 'erc721') {

    }

    if (type === 'erc1155') {
      
    }
    dispatch(actionsNewRetroDrop.setLoading(false))
    callback()
  } catch (err) {
    console.error(err)
    alert('Some error occured, please check token address')
  }
}

const createIpfs = async (data: any, title: string, description: string, logoURL: string, tokenAddress: string, chainId: number, type: TTokenType ) => {
  const merkleTree = {
    ...data,
    title,
    description,
    logoURL,
    tokenAddress,
    chainId,
    type
  }
  const response: TIPFSResponse = await pinataApi.post(merkleTree)
  return response
}