import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions';
import { CampaignActions } from '../types';
import { TTokenType } from 'types'
import { ERC20Contract, ERC721Contract, ERC1155Contract } from 'abi'
import { ethers } from 'ethers'
import { NATIVE_TOKEN_ADDRESS } from 'configs/app'
import { UserActions } from '../../user/types'
import * as userAsyncActions from '../../user/async-actions'

import {
  defineNativeTokenSymbol
} from 'helpers'
// type TIPFSResponse = { data: { IpfsHash: string, PinSize: number, Timestamp: string } }

async function setTokenContractData (
  dispatch: Dispatch<CampaignActions | UserActions>,
  tokenAddress: string,
  provider: any,
  type: TTokenType,
  address: string,
  chainId: number
) {
  console.log({ tokenAddress })
  if (!tokenAddress || tokenAddress.length !== 42) {
    dispatch(actionsCampaign.setTokenAddress(null))
    dispatch(actionsCampaign.setDecimals(null))
    dispatch(actionsCampaign.setSymbol(null))
    return
  }
  try {
    dispatch(actionsCampaign.setLoading(true))
    console.log('added', { tokenAddress })
    dispatch(actionsCampaign.setTokenAddress(tokenAddress))
    const signer = await provider.getSigner()
    dispatch(actionsCampaign.setLoading(true))
    if (type.toUpperCase() === 'ERC20') {
      let decimals = 18
      let symbol = defineNativeTokenSymbol({ chainId })
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
      
      dispatch(actionsCampaign.setDecimals(decimals))
      dispatch(actionsCampaign.setSymbol(symbol))
    }
    if (type.toUpperCase() === 'ERC721') {
      console.log({ })
      const contractInstance = await new ethers.Contract(tokenAddress, ERC721Contract.abi, signer)
      const symbol = await contractInstance.symbol()
      dispatch(actionsCampaign.setSymbol(symbol))
    }
    if (type.toUpperCase() === 'ERC1155') {
      const contractInstance = await new ethers.Contract(tokenAddress, ERC1155Contract.abi, signer)
      try {
        const symbol = await contractInstance.name()
        dispatch(actionsCampaign.setSymbol(symbol))
      } catch (e) {
        dispatch(actionsCampaign.setSymbol('ERC1155'))
      }
      
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

export default setTokenContractData
