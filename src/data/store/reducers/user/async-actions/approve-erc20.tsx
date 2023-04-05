import { Dispatch } from 'redux'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import {
  UserActions
} from '../types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import {
  defineNetworkName,
  alertError
} from 'helpers'
import { utils, ethers } from 'ethers'
import { RootState } from 'data/store';
import { ERC20Contract } from 'abi'
import { TAssetsData, TLinkContent, TTotalAmount } from 'types'
import { plausibleApi } from 'data/api'
import { bignumber } from 'mathjs'

const approve = (
  assets: TAssetsData,
  totalAmount: TTotalAmount,
  assetsOriginal: TLinkContent[],
  sdk: boolean,
  sponsored: boolean,
  callback?: () => void
) => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<CampaignActions>,
    getState: () => RootState
  ) => {
    dispatch(campaignActions.setAssets(assets))
    dispatch(campaignActions.setSdk(sdk))
    dispatch(campaignActions.setSponsored(sponsored))
    dispatch(campaignActions.setAssetsOriginal(assetsOriginal))
    const {
      user: {
        signer,
        address,
        chainId,
        tokenAmountFormatted,
        tokenAmount
      },
      campaign: {
        tokenAddress,
        symbol,
        decimals,
        proxyContractAddress,
        tokenStandard,
        claimPattern
      }
    } = getState()

    try {
      if (!tokenAddress) {
        return alertError('No token address provided')
      }
      if (!assets) {
        return alertError('No assets provided')
      }
      if (!symbol) {
        return alertError('No symbol provided')
      }
      if (!decimals) {
        return alertError('No decimals provided')
      }
      if (!proxyContractAddress) {
        return alertError('No proxy address provided')
      }
      if (!address) {
        return alertError('No user address provided')
      }
      dispatch(campaignActions.setLoading(true))
      dispatch(campaignActions.setClaimPattern('transfer'))
      const contractInstance = await new ethers.Contract(tokenAddress, ERC20Contract.abi, signer)
      let iface = new utils.Interface(ERC20Contract.abi)

      const amountToApprove = totalAmount.amount
      const amountToApproveFormatted = totalAmount.original_amount

      if (!amountToApprove || !amountToApproveFormatted) {
        dispatch(campaignActions.setLoading(false))
        return alertError(`Cannot define amount of tokens to approve`)
      }

      if (!tokenAmountFormatted) {
        dispatch(campaignActions.setLoading(false))
        return alertError(`No tokens to approve`)
      }

      console.log('here', tokenAmount, amountToApprove)

      if (amountToApprove.gt(bignumber(String(tokenAmount)))) {
        dispatch(campaignActions.setLoading(false))
        return alertError(
          `Not enough tokens to approve. Current balance: ${tokenAmountFormatted}, tokens to approve: ${amountToApproveFormatted}`
        )
      }
      const data = await iface.encodeFunctionData('approve', [
        proxyContractAddress, String(amountToApprove)
      ])
      
      plausibleApi.invokeEvent({
        eventName: 'camp_step3_filled',
        data: {
          network: defineNetworkName(chainId),
          token_type: tokenStandard as string,
          claim_pattern: claimPattern,
          distribution: sdk ? 'sdk' : 'manual',
          sponsorship: sponsored ? 'sponsored' : 'non sponsored'
        }
      })

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
            if (allowed >= amountToApprove) {
              resolve(true)
              clearInterval(checkInterval)
            }
          }, 3000)
        })
      }
      const finished = await checkTransaction()
      if (finished) {
        plausibleApi.invokeEvent({
          eventName: 'camp_step3_passed',
          data: {
            network: defineNetworkName(chainId),
            token_type: tokenStandard as string,
            claim_pattern: claimPattern,
            distribution: sdk ? 'sdk' : 'manual',
            sponsorship: sponsored ? 'sponsored' : 'non sponsored'
          }
        })
        dispatch(campaignActions.setApproved(true))
        if (callback) { callback() }
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
