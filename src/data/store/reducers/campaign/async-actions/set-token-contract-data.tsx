import { Dispatch } from 'redux'
import * as actionsCampaign from '../actions'
import { CampaignActions } from '../types'
import { TTokenType } from 'types'
import { ERC20Contract, ERC721Contract, ERC1155Contract } from 'abi'
import { ethers } from 'ethers'
import { NATIVE_TOKEN_ADDRESS } from 'configs/app'
import * as userAsyncActions from '../../user/async-actions'
import { RootState, IAppDispatch } from 'data/store'
import { alertError } from 'helpers'

import {
  defineNativeTokenSymbol
} from 'helpers'
// type TIPFSResponse = { data: { IpfsHash: string, PinSize: number, Timestamp: string } }

function setTokenContractData (
  tokenAddress: string,
  type: TTokenType,
) {
  return async (
    dispatch: Dispatch<CampaignActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    if (!tokenAddress || tokenAddress.length !== 42) {
      dispatch(actionsCampaign.setTokenAddress(null))
      dispatch(actionsCampaign.setDecimals(null))
      dispatch(actionsCampaign.setSymbol(null))
      return
    }

    const { user: { chainId, address, signer } } = getState()
    try {
      dispatch(actionsCampaign.setLoading(true))
      console.log('added', { tokenAddress })
      dispatch(actionsCampaign.setTokenAddress(tokenAddress))
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
        const contractInstance = await new ethers.Contract(tokenAddress, ERC721Contract.abi, signer)
        
        try {
          const symbol = await contractInstance.name()
          dispatch(actionsCampaign.setSymbol(symbol))
        } catch (e) {
          console.log({ e })
          dispatch(actionsCampaign.setSymbol('ERC721 Token'))
        }
        dispatch(actionsCampaign.setDecimals(1))
      }
      if (type.toUpperCase() === 'ERC1155') {
        const contractInstance = await new ethers.Contract(tokenAddress, ERC1155Contract.abi, signer)
        try {
          const symbol = await contractInstance.name()
          dispatch(actionsCampaign.setSymbol(symbol))
        } catch (e) {
          console.log({ e })
          dispatch(actionsCampaign.setSymbol('ERC1155 Token'))
        }
        dispatch(actionsCampaign.setDecimals(1))
      }
      dispatch(actionsCampaign.setLoading(false))
    } catch (err) {
      console.error(err)
      dispatch(actionsCampaign.setLoading(false))
      dispatch(actionsCampaign.setDecimals(null))
      dispatch(actionsCampaign.setSymbol(null))
      alertError('Please check token address')
    }
  }
}

export default setTokenContractData
