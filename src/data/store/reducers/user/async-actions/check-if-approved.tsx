import { Dispatch } from 'redux'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import {
  UserActions
} from '../types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import { ethers } from 'ethers'
import { RootState } from 'data/store';
import { ERC721Contract, ERC1155Contract } from 'abi'

const checkIfApproved = (
  callback?: () => void
) => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<CampaignActions>,
    getState: () => RootState
  ) => {
    const {
      user: {
        provider,
        address
      },
      campaign: {
        tokenAddress,
        tokenStandard,
        proxyContractAddress
      }
    } = getState()
    dispatch(campaignActions.setLoading(true))
    try {
      if (!tokenAddress) {
        return alert('No token address provided')
      }
      if (!address) {
        return alert('No user address provided')
      }
      
      const contractABI = tokenStandard === 'ERC1155' ? ERC1155Contract : ERC721Contract
      const signer = await provider.getSigner()
      const contractInstance = await new ethers.Contract(tokenAddress, contractABI.abi, signer)
      const isApproved = await contractInstance.isApprovedForAll(address, proxyContractAddress)
      console.log({ isApproved })
      if (isApproved) {
        dispatch(campaignActions.setApproved(true))
        callback && callback()
      }

    } catch (err) {
      console.log({
        err
      })
    }
    dispatch(campaignActions.setLoading(false))
  }
}

export default checkIfApproved
