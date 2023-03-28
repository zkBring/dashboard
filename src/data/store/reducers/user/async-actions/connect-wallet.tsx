import { Dispatch } from 'redux'
import * as actions from '../actions'
import * as asyncActions from '../async-actions'
import {
  UserActions
} from '../types'
import Web3Modal from "web3modal"
import { Web3Provider } from '@ethersproject/providers'
import { IAppDispatch } from 'data/store'
import {
  getNativeTokenAmount,
  getComission
 } from './index'
 import { plausibleApi } from 'data/api'
import { defineNetworkName } from 'helpers'

async function connectWallet (
  dispatch: Dispatch<UserActions> & IAppDispatch,
  chainsAvailable: (number | string)[]
) {

  try {
    const web3Modal = new Web3Modal({
      cacheProvider: false, // optional
      providerOptions: {}
    })
    
    const provider = await web3Modal.connect();
    const providerWeb3 = new Web3Provider(provider)
    
    let { chainId } = await providerWeb3.getNetwork()
    provider.on("accountsChanged", async (accounts: string[]) => {
      dispatch(asyncActions.logout())
    })
    
    // Subscribe to chainId change
    provider.on("chainChanged", async (chainId: string) => {
      dispatch(asyncActions.logout())
    })
  
    if (!chainsAvailable.find(network => Number(chainId) === Number(network))) {
      dispatch(actions.setChainId(chainId))
      return dispatch(actions.setAuthorizationStep('wrong_network'))
    }
    
    const accounts = await providerWeb3.listAccounts()
    const address = accounts[0] && accounts[0].toLowerCase()
    const comissionRes = await getComission(
      chainId,
      address
    )

    if (comissionRes) {
      const { comission, whitelisted } = comissionRes
      console.log({ comission, whitelisted })
      dispatch(actions.setWhitelisted(whitelisted))
      dispatch(actions.setComission(comission))
    }
    dispatch(actions.setProvider(providerWeb3))
    
    dispatch(actions.setAuthorizationStep('login'))

    plausibleApi.invokeEvent({
      eventName: 'sign_in_step1',
      data: {
        network: defineNetworkName(chainId)
      }
    })

    dispatch(actions.setAddress(address))
    dispatch(actions.setChainId(chainId))
  
    await getNativeTokenAmount(
      dispatch,
      chainId,
      address,
      providerWeb3
    )
  } catch (err) {
    console.log({ err })
  }

  
}

export default connectWallet