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
import { ERC721Contract } from 'abi'

const approve = (
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
        assets,
        proxyContractAddress
      }
    } = getState()

    try {
      if (!tokenAddress) {
        return alert('No token address provided')
      }
      if (!assets) {
        return alert('No assets provided')
      }
      if (!proxyContractAddress) {
        return alert('No proxy address provided')
      }
      if (!address) {
        return alert('No user address provided')
      }
      dispatch(campaignActions.setLoading(true))
      const signer = await provider.getSigner()
      const contractInstance = await new ethers.Contract(tokenAddress, ERC721Contract.abi, signer)
      await contractInstance.setApprovalForAll(proxyContractAddress, true)
  
      const checkTransaction = async function (): Promise<boolean> {
        return new Promise((resolve, reject) => {
          const checkInterval = setInterval(async () => {
            const isApproved = await contractInstance.isApprovedForAll(address, proxyContractAddress)
            console.log({ isApproved })
            if (isApproved) {
              resolve(true)
              clearInterval(checkInterval)
            }
          }, 3000)
        })
      }
      const finished = await checkTransaction()
      if (finished) {
        dispatch(campaignActions.setApproved(true))
        if (callback) { callback() }
      }
    } catch (err) {
      console.log({
        err
      })
    }
    dispatch(campaignActions.setLoading(false))
  }
}

export default approve
