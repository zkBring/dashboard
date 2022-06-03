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

async function switchNetwork (
  dispatch: Dispatch<UserActions> & IAppDispatch,
	provider: any,
  chainId: number,
  address: string
) {
  try {
    await provider.provider.request({
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
    window.location.href = ''
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

            window.location.href = ''
          }
        } catch (addError) {
          // handle "add" error
        }
      }    
  }
}

export default switchNetwork