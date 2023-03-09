import { Dispatch } from 'redux'
import * as actions from '../actions'
import * as asyncActions from '../async-actions'
import {
  UserActions
} from '../types'
import {
  defineNetworkName
} from 'helpers'
import Web3Modal from "web3modal"
import { Web3Provider } from '@ethersproject/providers'
import { IAppDispatch } from 'data/store'
import {
  getNativeTokenAmount
 } from './index'
 const { REACT_APP_INFURA_ID } = process.env

async function connectWallet (
  dispatch: Dispatch<UserActions> & IAppDispatch,
  chainsAvailable: (number | string)[]
) {

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
  dispatch(actions.setProvider(providerWeb3))
  dispatch(actions.setAuthorizationStep('login'))

  dispatch(actions.setAddress(address))
  dispatch(actions.setChainId(chainId))

  await getNativeTokenAmount(
    dispatch,
    chainId,
    address,
    providerWeb3
  )
}

// const authorize = async (provider: any) => {
//   const signer = await provider.getSigner()
//   const message = await signer.signMessage(`I’m signing this message to login to Linkdrop Dashboard at ${new Date()}`)
//   console.log({ message })
// }

export default connectWallet