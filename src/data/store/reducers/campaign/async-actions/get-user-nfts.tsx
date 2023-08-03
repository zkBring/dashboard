
import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions'
import * as actionsUser from '../../user/actions'
import { CampaignActions } from '../types'
import { UserActions } from '../../user/types'
import { TAlchemyNFTToken, TTokenType } from 'types'
import { IAppDispatch } from 'data/store'
import { Alchemy } from 'alchemy-sdk'
import { defineAlchemyNetwork, defineNetworkName, alertError } from 'helpers'
import { RootState } from 'data/store'

const { REACT_APP_ALCHEMY_API_KEY } = process.env

function getUserNFTs(
  tokenStandard: TTokenType
) {
  return async (
    dispatch: Dispatch<CampaignActions> & Dispatch<UserActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    dispatch(actionsCampaign.setLoading(true))

    try {
      const { user: { chainId, address }, campaign: { tokenAddress } } = getState()
      if (!chainId) {
        return alertError('No chainId provided in state of user')
      }
      if (!tokenAddress) {
        return alertError('No tokenAddress provided in state of user')
      }

      if (tokenStandard !== 'ERC20') {
        const network = defineAlchemyNetwork(chainId)
        if (network) {
          const alchemy = new Alchemy({
            apiKey: REACT_APP_ALCHEMY_API_KEY,
            network
          })
      
          const { ownedNfts } = await alchemy.nft.getNftsForOwner(address, {
            contractAddresses: [ tokenAddress ]
          })
          
          if (ownedNfts && ownedNfts.length > 0) {
            dispatch(actionsUser.setNFTs(ownedNfts as TAlchemyNFTToken[]))
          }
        }
        
      }

    } catch (err) {
      console.error({
        err
      })
    }
    dispatch(actionsCampaign.setLoading(false))
  }
}

export default getUserNFTs
