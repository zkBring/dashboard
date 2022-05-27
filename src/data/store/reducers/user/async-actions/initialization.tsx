import { Dispatch } from 'redux'
import * as actions from '../actions'
import {
  UserActions,
} from '../types'
import {
  defineNetworkName,
  defineJSONRpcUrl,
} from 'helpers'
import LinkdropSDK from '@linkdrop/sdk'
import { INFURA_ID } from 'configs/app'
import { RootState } from 'data/store';
const { REACT_APP_FACTORY_ADDRESS, REACT_APP_CLAIM_HOST } = process.env

const initialization = (
  chainId: number | null, address: string
) => {
  return async (dispatch: Dispatch<UserActions>, getState: () => RootState) => {
    if (!REACT_APP_FACTORY_ADDRESS) {
      return alert('REACT_APP_FACTORY_ADDRESS is not provided in .env file')
    }
    if (!REACT_APP_CLAIM_HOST) {
      return alert('REACT_APP_CLAIM_HOST is not provided in .env file')
    }
    if (!chainId) {
      return alert('Chain is not detected')
    }
    if (!INFURA_ID) {
      return alert('INFURA_ID is not provided in configs/app file')
    }
    const networkName = defineNetworkName(chainId)
    const jsonRpcUrl = defineJSONRpcUrl({ chainId, infuraPk: INFURA_ID })
    const sdk = new LinkdropSDK({
      claimHost: REACT_APP_CLAIM_HOST,
      factoryAddress: REACT_APP_FACTORY_ADDRESS,
      chain: networkName,
      linkdropMasterAddress: address,
      jsonRpcUrl,
      apiHost: `https://${networkName}.linkdrop.io`
    })

    dispatch(actions.setSDK(sdk))
  }
}

export default initialization