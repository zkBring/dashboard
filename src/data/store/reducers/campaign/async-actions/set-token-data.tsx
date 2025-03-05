
import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions'
import { CampaignActions } from '../types'
import { UserActions } from '../../user/types'
import { TAsset, TLinkContent, TTokenType } from 'types'
import { IAppDispatch } from 'data/store'
import { defineIfUserHasEnoughERC20Tokens, alertError } from 'helpers'
import { RootState } from 'data/store'
import { utils, BigNumber } from 'ethers'

function setTokenData(
  tokenStandard: TTokenType,
  totalClaims: string,
  tokensPerClaim: string,
  callback?: () => void
) {
  // @ts-ignore
  return async (
    dispatch: Dispatch<CampaignActions> & Dispatch<UserActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    const {
      user: {
        chainId,
        tokenAmount
      },
      campaign: {
        tokenAddress,
        decimals,
        symbol
      }
    } = getState()

    if (decimals === undefined || decimals === null) {
      return alertError('decimals not defined')
    }

    if (!chainId) {
      return alertError('No chainId provided in state of user')
    }

    if (!tokenAddress) {
      return alertError('No tokenAddress provided in state of user')
    }

    try {
  
      const tokenAmountFormatted = (tokenAmount && decimals !== null) ? utils.formatUnits(tokenAmount, decimals) : '0'

      const hasEnoughTokens = defineIfUserHasEnoughERC20Tokens(
        tokenAmount as BigNumber,
        tokensPerClaim as string,
        totalClaims as string,
        decimals,
      )

      if (!hasEnoughTokens) {
        return alert(`Not enough tokens on balance. Current balance: ${tokenAmountFormatted} ${symbol}`)
      }

      dispatch(actionsCampaign.setLoading(true))
      dispatch(actionsCampaign.setTokenStandard(tokenStandard))
      dispatch(actionsCampaign.setClaimPattern('transfer'))

      const assets: TAsset[] = []
      for (let i = 0; i < Number(totalClaims); i++) {
        const asset: TAsset = {
          original_amount: tokensPerClaim, // human readable amount
          amount: String(utils.parseUnits(tokensPerClaim, decimals)), // atomic amount
          id: 1
        }

        console.log({
          asset
        })

        assets.push(asset)
      }

      dispatch(actionsCampaign.setAssets(assets))

      if (callback) {
        callback()
      }
    } catch (err) {
      console.error({
        err
      })
    }
    dispatch(actionsCampaign.setLoading(false))
  }
}

export default setTokenData
