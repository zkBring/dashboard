import { Dispatch } from 'redux';
import * as actionsCampaign from './actions';
import { CampaignActions } from './types';
import { TTokenType } from 'types'
import { ERC20Contract } from 'abi'
import { ethers } from 'ethers'
import { NATIVE_TOKEN_ADDRESS } from 'configs/app'
import { UserActions } from '../user/types'
import * as userAsyncActions from '../user/async-actions'
import { RootState, IAppDispatch } from 'data/store'

import {
  defineNativeTokenSymbol
} from 'helpers'
// type TIPFSResponse = { data: { IpfsHash: string, PinSize: number, Timestamp: string } }


export async function setTokenContractData(
  dispatch: Dispatch<CampaignActions | UserActions>,
  tokenAddress: string,
  provider: any,
  type: TTokenType,
  address: string,
  chainId: number
) {
  if (!tokenAddress || tokenAddress.length !== 42) {
    dispatch(actionsCampaign.setTokenAddress(null))
    dispatch(actionsCampaign.setDecimals(null))
    dispatch(actionsCampaign.setSymbol(null))
    return
  }
  try {
    dispatch(actionsCampaign.setLoading(true))
    dispatch(actionsCampaign.setTokenAddress(tokenAddress))
    const signer = await provider.getSigner()
    dispatch(actionsCampaign.setLoading(true))
    if (type === 'erc20') {
      let decimals = 18
      let symbol = defineNativeTokenSymbol({ chainId })
      console.log('here')
      if (tokenAddress === NATIVE_TOKEN_ADDRESS) {

      } else {
        const contractInstance = await new ethers.Contract(tokenAddress, ERC20Contract.abi, signer)
        decimals = await contractInstance.decimals()
        symbol = await contractInstance.symbol()
        
        await userAsyncActions.getTokenAmount(
          dispatch,
          address,
          decimals,
          contractInstance
        )
      }
      console.log({ symbol, decimals })
      
      dispatch(actionsCampaign.setDecimals(decimals))
      dispatch(actionsCampaign.setSymbol(symbol))
    }
    if (type === 'erc721') {

    }

    if (type === 'erc1155') {
      
    }
    dispatch(actionsCampaign.setLoading(false))
  } catch (err) {
    console.error(err)
    dispatch(actionsCampaign.setLoading(false))
    dispatch(actionsCampaign.setDecimals(null))
    dispatch(actionsCampaign.setSymbol(null))
    alert('Some error occured, please check token address')
  }
}

export async function setAssetsData(
  dispatch: Dispatch<CampaignActions>,
  type: TTokenType,
  assets: any,
  wallet: string,
  callback?: () => void
) {
  dispatch(actionsCampaign.setAssets(assets))
  dispatch(actionsCampaign.setType(type))
  dispatch(actionsCampaign.setWallet(wallet))
  
  if (callback) {
    callback()
  }
}

export const createProxyContract = () => {
  return async (
    dispatch: Dispatch<CampaignActions | UserActions>,
    getState: () => RootState
  ) => {
    const { user: { sdk }, campaigns: { campaigns } } = getState()
    const proxyContractAddress = await sdk?.getProxyAddress(String(campaigns.length))
    if (!proxyContractAddress) { return }
    dispatch(actionsCampaign.setProxyContractAddress(proxyContractAddress))
  }
}
