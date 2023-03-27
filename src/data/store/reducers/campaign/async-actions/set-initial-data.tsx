
import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions'
import * as actionsUser from '../../user/actions'
import { CampaignActions } from '../types'
import { UserActions } from '../../user/types'
import { TAlchemyNFTToken, TTokenType } from 'types'
import { IAppDispatch } from 'data/store'
import { Alchemy } from 'alchemy-sdk'
import { defineAlchemyNetwork, defineNetworkName } from 'helpers'
import { RootState } from 'data/store'
import { plausibleApi } from 'data/api'
const { REACT_APP_ALCHEMY_API_KEY } = process.env

function setInitialData(
  tokenStandard: TTokenType,
  title: string,
  callback?: () => void
) {
  return async (
    dispatch: Dispatch<CampaignActions> & Dispatch<UserActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    dispatch(actionsCampaign.setLoading(true))
    dispatch(actionsCampaign.setTokenStandard(tokenStandard))
    dispatch(actionsCampaign.setTitle(title))

    try {
      const { user: { chainId, address }, campaign: { tokenAddress } } = getState()
      if (!chainId) {
        return alert('No chainId provided in state of user')
      }
      if (!tokenAddress) {
        return alert('No tokenAddress provided in state of user')
      }

      if (tokenStandard !== 'ERC20') {
        const alchemy = new Alchemy({
          apiKey: REACT_APP_ALCHEMY_API_KEY,
          network: defineAlchemyNetwork(chainId)
        })
    
        const { ownedNfts } = await alchemy.nft.getNftsForOwner(address, {
          contractAddresses: [ tokenAddress ]
        })
        
        if (ownedNfts && ownedNfts.length > 0) {
          dispatch(actionsUser.setNFTs(ownedNfts as TAlchemyNFTToken[]))
        }
      }

      await plausibleApi.invokeEvent({
        eventName: 'camp_step1_passed',
        data: {
          network: defineNetworkName(chainId),
          token_type: tokenStandard
        }
      })

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

export default setInitialData
