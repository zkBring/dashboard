import { Dispatch } from 'redux'
import {
  UserActions
} from '../types'
import { IMetamaskError } from 'types'
import {
  initialization,
  getNativeTokenAmount
 } from './index'
import {
  toHex,
} from 'helpers'
import chains from 'configs/chains'
import { IAppDispatch } from 'data/store';
import * as actions from '../actions'

async function switchNetwork (
  dispatch: Dispatch<UserActions> & IAppDispatch,
	provider: any,
  chainId: number,
  address: string
) {
  try {
    const result = await provider.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: toHex(chainId) }],
    })
    dispatch(initialization(chainId, address))
    await getNativeTokenAmount(
      dispatch,
      chainId,
      address,
      provider
    )
  } catch (err) {
      const switchError = err as IMetamaskError;
      if (switchError.code && switchError.code === 4902) {
        try {
          const chainObj = chains[chainId]
          if (chainObj) {
            const data = {
              ...chainObj,
              chainId: `0x${toHex(chainId)}`
            }
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [data],
            })
            dispatch(initialization(chainId, address))
            await getNativeTokenAmount(
              dispatch,
              chainId,
              address,
              provider
            )
          }
        } catch (addError) {
          // handle "add" error
        }
      }    
  }
}

export default switchNetwork