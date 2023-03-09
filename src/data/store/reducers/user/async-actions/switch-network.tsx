import { Dispatch } from 'redux'
import {
  UserActions
} from '../types'
import { IMetamaskError } from 'types'
import {
  toHex,
} from 'helpers'
import chains from 'configs/chains'
import { IAppDispatch } from 'data/store';
import * as asyncActions from '../async-actions'

async function switchNetwork (
  dispatch: Dispatch<UserActions> & IAppDispatch,
	provider: any,
  chainId: number,
  address: string,
  callback: () => void
) {
  try {
    await provider.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: toHex(chainId) }],
    })
    dispatch(asyncActions.logout())
    callback && callback()
    
  } catch (err) {
      const switchError = err as IMetamaskError
      if (switchError.code && switchError.code === 4902) {
        try {
          const chainObj = chains[chainId]
          if (chainObj) {
            const data = {
              chainName: chainObj.chainName,
              nativeCurrency: chainObj.nativeCurrency,
              rpcUrls: chainObj.rpcUrls,
              blockExplorerUrls: chainObj.blockExplorerUrls,
              chainId: toHex(chainId)
            }

            await provider.provider.request({
              method: 'wallet_addEthereumChain',
              params: [data],
            })
            dispatch(asyncActions.logout())
            callback && callback()
          }
        } catch (addError) {
          // handle "add" error
        }
      }    
  }
}

export default switchNetwork