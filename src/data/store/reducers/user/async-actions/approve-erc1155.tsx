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
import { ERC1155Contract } from 'abi'
import { TAssetsData, TLinkContent, TDistributionPattern } from 'types'
import { sleep } from 'helpers'

const approve = (
  assets: TAssetsData,
  assetsOriginal: TLinkContent[],
  sdk: boolean,
  sponsored: boolean,
  callback?: () => void
) => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<CampaignActions>,
    getState: () => RootState
  ) => {
    dispatch(campaignActions.setLoading(true))
    dispatch(campaignActions.setAssets(assets))
    dispatch(campaignActions.setSdk(sdk))
    dispatch(campaignActions.setSponsored(sponsored))
    dispatch(campaignActions.setAssetsOriginal(assetsOriginal))
    const {
      user: {
        provider,
        address
      },
      campaign: {
        tokenAddress,
        proxyContractAddress,
        approved
      }
    } = getState()

    if (approved) {
      await sleep(2000)
      dispatch(campaignActions.setLoading(false))
      if (callback) { callback() }
      return
    }

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
      dispatch(campaignActions.setClaimPattern('transfer'))
      const signer = await provider.getSigner()
      const contractInstance = await new ethers.Contract(tokenAddress, ERC1155Contract.abi, signer)
      await contractInstance.setApprovalForAll(proxyContractAddress, true)
  
      const checkTransaction = async function (): Promise<boolean> {
        return new Promise((resolve, reject) => {
          const checkInterval = setInterval(async () => {
            const isApproved = await contractInstance.isApprovedForAll(address, proxyContractAddress)
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
