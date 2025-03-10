import { Dispatch } from 'redux'
import * as campaignActions from 'data/store/reducers/campaign/actions'

import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import {
  alertError
} from 'helpers'
import { utils, ethers } from 'ethers'
import { IAppDispatch, RootState } from 'data/store'
import { ERC20Contract } from 'abi'

const approve = (
  totalAmount: string,
  callback?: () => void
) => {

  return async (
    dispatch: Dispatch<CampaignActions> & IAppDispatch,
    getState: () => RootState,
  ) => {
    try {
      dispatch(campaignActions.setLoading(true))
      const {
        user: {
          signer,
          address,
        },
        campaign: {
          assets,
          tokenAddress,
          decimals,
          proxyContractAddress
        }
    
      } = getState()
    
      if (!assets) {
        return alertError('assets are not defined')
      }
    
      if (!tokenAddress) {
        return alertError('tokenAddress is not defined')
      }
    
      const amount = assets[0].amount
    
      const amountToApprove = ethers.utils.parseUnits(totalAmount, decimals as number)

      if (!amountToApprove) {
        dispatch(campaignActions.setLoading(false))
        return alertError(`Cannot define amount of tokens to approve`)
      }
    
      const contractInstance = new ethers.Contract(tokenAddress, ERC20Contract.abi, signer)
      let iface = new utils.Interface(ERC20Contract.abi)
      const alreadyAllowed = await contractInstance.allowance(address, proxyContractAddress)
    
      if (alreadyAllowed.gte(amountToApprove)) {
        dispatch(campaignActions.setLoading(false))
        dispatch(campaignActions.setApproved(true))
        if (callback) { callback() }
        return alertError(`Already approved`)
      }
    
      const tokenAmount = await contractInstance.balanceOf(address)
    
      console.log({ tokenAmount, decimals })
    
          
      if (amountToApprove.gt(tokenAmount)) {
        dispatch(campaignActions.setLoading(false))
        return alertError(
          `Not enough tokens to approve. Tokens to approve: ${amountToApprove}`
        )
      }
    
      // const formatted = ethers.utils.parseUnits(String(amountToApprove), decimals)
    
      let data = iface.encodeFunctionData('approve', [
        proxyContractAddress, String(amountToApprove)
      ])
    
      await signer.sendTransaction({
        to: tokenAddress,
        from: address,
        value: 0,
        data: data
      })
    
      const checkTransaction = async function (): Promise<boolean> {
        return new Promise((resolve) => {
          const checkInterval = setInterval(async () => {
            const allowed = await contractInstance.allowance(address, proxyContractAddress)
            if (allowed.gte(amountToApprove)) {
              resolve(true)
              clearInterval(checkInterval)
            }
          }, 3000)
        })
      }
      await checkTransaction()
      dispatch(campaignActions.setApproved(true))
      dispatch(campaignActions.setLoading(false))
      dispatch(campaignActions.setTransactionStage('launch'))

    } catch (err) {
      console.log({ err })
    }

    dispatch(campaignActions.setLoading(false))

  }
  
}

export default approve
