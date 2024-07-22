import { Dispatch } from 'redux'
import {
  UserActions
} from '../types'
import { IMetamaskError } from 'types'
import {
  toHex,
  alertError
} from 'helpers'
import chains from 'configs/chains'
import { IAppDispatch, RootState } from 'data/store';
import * as asyncActions from '../async-actions'

function switchNetwork (
  chainId: number,
  callback: () => void
) {
  // @ts-ignore
  return async (
    dispatch: Dispatch<UserActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    const { user: { provider, signer } } = getState()
    if (!chainId) {
      return alertError('Current chain ID is not provided')
    }
    
    try {
      const request = await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: toHex(chainId)
        }],
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
  
              await provider.request({
                method: 'wallet_addEthereumChain',
                params: [data],
              })
              dispatch(asyncActions.logout())
              callback && callback()
            }
          } catch (err) {
            alertError('Check console for more information')
            console.error({ err })
            // handle "add" error
          }
        }    
    }
  }
  
}

export default switchNetwork