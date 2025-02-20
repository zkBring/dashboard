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
import { campaignsApi } from 'data/api'

const approve = (
  tokenAddress: string,
  proxyContractAddress: string,
  batchId: string | number,
  campaignId: string,
  callback?: () => void
) => {
  return async (
    dispatch: Dispatch<CampaignActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    
    dispatch(campaignActions.setLoading(true))
    const {
      user: {
        signer,
        address,
      },

    } = getState()

    try {
      const result = await campaignsApi.getBatch(campaignId, batchId)

      if (result.data.success) {
        const { claim_links, batch } = result.data
        const linksCount = claim_links.length
        const tokensPerLink = claim_links[0].token_amount as string

        console.log({
          linksCount,
          tokensPerLink
        })
        const amountToApprove = ethers.BigNumber.from(tokensPerLink).mul(linksCount)
        console.log({ amountToApprove })
        if (!amountToApprove) {
          dispatch(campaignActions.setLoading(false))
          if (callback) { callback() }
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
        const decimals = await contractInstance.decimals()

        console.log({ tokenAmount, decimals })

            
        if (amountToApprove.gt(tokenAmount)) {
          dispatch(campaignActions.setLoading(false))
          if (callback) { callback() }
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
        const finished = await checkTransaction()
        if (finished) {
          dispatch(campaignActions.setApproved(true))
          if (callback) { callback() }
        }
      }
    } catch (err) {
      alertError('Check console for more information')
      console.log({
        err
      })
    }
    dispatch(campaignActions.setLoading(false))
  }
}

export default approve
