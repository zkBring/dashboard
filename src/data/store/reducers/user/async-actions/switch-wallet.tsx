import { Dispatch } from 'redux'
import {
  UserActions
} from '../types'
import { IMetamaskError } from 'types'
import {
  toHex,
} from 'helpers'
import chains from 'configs/chains'

async function switchWallet (
  dispatch: Dispatch<UserActions>,
	provider: any,
  chainId: number
) {
  console.log(toHex(chainId))
  try {
    await provider.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: toHex(chainId) }],
    });
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
          }
        } catch (addError) {
          // handle "add" error
        }
      }    
  }
}

export default switchWallet