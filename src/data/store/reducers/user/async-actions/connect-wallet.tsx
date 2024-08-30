import { Dispatch } from 'redux'
import * as actions from '../actions'
import * as asyncActions from '../async-actions'
import {
  UserActions
} from '../types'
import { IAppDispatch } from 'data/store'
import {
  getNativeTokenAmount,
  getComission,
  getERC20TokenList
 } from './index'
import { ethers } from 'ethers'
import { plausibleApi, campaignsApi } from 'data/api'
import { defineNetworkName, defineJSONRpcUrl, alertError } from 'helpers'
import * as userActions from '../actions'
import {
  initialization
} from './index'
const { REACT_APP_INFURA_ID } = process.env

function connectWallet (
  connectorAddress: string,
  connectorChainID: number,
  connector: any,
  signer: any,
  chainsAvailable: (number | string)[]
) {
  // @ts-ignore
  return async (
    dispatch: Dispatch<UserActions> & IAppDispatch,
  ) => {
    dispatch(actions.setLoading(true))

    try {
      if (!chainsAvailable.find(network => Number(connectorChainID) === Number(network))) {
        dispatch(actions.setChainId(connectorChainID))
        plausibleApi.invokeEvent({
          eventName: 'sign_in_wrong_network'
        })
        return dispatch(actions.setAuthorizationStep('wrong_network'))
      }
      if (connector) {
        const provider = await connector.getProvider()
        provider.on("accountsChanged", async () => {
          dispatch(asyncActions.logout())
        })

        const connectorId: string = connector.id
      
        provider.on("chainChanged", async (newChain: any) => {
          if (newChain !== connectorChainID) {
            dispatch(asyncActions.logout())
          }
        })
        dispatch(actions.setSigner(signer))
        dispatch(actions.setProvider(provider))
        dispatch(actions.setAddress(connectorAddress))
        dispatch(actions.setChainId(connectorChainID))
        dispatch(actions.setConnectorId(connectorId))

        // try to fetch data

        try {
          const testIfAuthorized = await campaignsApi.get(connectorChainID)
          if (testIfAuthorized) {
            dispatch(actions.setAuthorizationStep('authorized'))
          }
          dispatch(initialization())
        } catch (err) {
          dispatch(actions.setAuthorizationStep('login'))
          console.log('TOKEN IS NOT AVAILABLE')
        }

        plausibleApi.invokeEvent({
          eventName: 'sign_in_step1',
          data: {
            network: defineNetworkName(connectorChainID)
          }
        })
          
        const comissionRes = await getComission(
          connectorChainID,
          connectorAddress
        )
        if (comissionRes) {
          const { comission, whitelisted } = comissionRes
          dispatch(userActions.setWhitelisted(whitelisted))
          dispatch(userActions.setComission(comission))
        }

        if (connectorChainID === 1 || connectorChainID === 137 || connectorChainID === 8453) {
          const tokenList = await getERC20TokenList(connectorChainID)
          if (tokenList) {
            dispatch(userActions.setTokenListERC20(tokenList))
          }
        }

        const jsonRpcUrl = defineJSONRpcUrl({ chainId: Number(connectorChainID), infuraPk: REACT_APP_INFURA_ID as string })
        const jsonRpcProvider = new ethers.providers.JsonRpcProvider(jsonRpcUrl)
        dispatch(actions.setJsonRPCProvider(jsonRpcProvider))
    
        getNativeTokenAmount(
          dispatch,
          connectorChainID,
          connectorAddress,
          jsonRpcProvider
        )
      }
  
    } catch (err) {
      alertError('Check console for more information')
      console.log({ err })
    }
    dispatch(actions.setLoading(false))
  }
}

export default connectWallet