import { Dispatch } from 'redux'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import {
  UserActions
} from '../types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import { ethers } from 'ethers'
import { RootState } from 'data/store'
import { defineContract } from 'helpers'
import contracts from 'configs/contracts'

const checkIfGranted = () => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<CampaignActions>,
    getState: () => RootState
  ) => {
    dispatch(campaignActions.setApproved(null))
    const {
      user: {
        provider,
        address,
        chainId
      },
      campaign: {
        tokenAddress,
        tokenStandard,
        proxyContractAddress
      }
    } = getState()
    try {

      if (!tokenAddress) {
        return alert('No token address provided')
      }

      if (!tokenStandard) {
        return alert('No tokenStandard provided')
      }

      if (!address) {
        return alert('No user address provided')
      }

      if (!chainId) {
        return alert('No chainId provided')
      }

      const contract = contracts[chainId]
      
      const contractABI = defineContract(tokenStandard)
      const signer = await provider.getSigner()
      const contractInstance = await new ethers.Contract(tokenAddress, contractABI.abi, signer)
      const isGranted = await contractInstance.hasRole(contract.minter_role, proxyContractAddress)
      dispatch(campaignActions.setApproved(isGranted))

    } catch (err) {
      console.log({
        err
      })
    }
  }
}

export default checkIfGranted
