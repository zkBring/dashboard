import { Dispatch } from 'redux'
import * as userActions from 'data/store/reducers/user/actions'
import {
  UserActions
} from '../types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import { RootState } from 'data/store'
import { Alchemy, OwnedNft } from 'alchemy-sdk'
import { TAlchemyToken } from 'types'
import { convertAlchemyTokens, defineAlchemyNetwork } from 'helpers'
const { REACT_APP_ALCHEMY_API_KEY } = process.env

const getNFTTokens = () => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<CampaignActions>,
    getState: () => RootState
  ) => {
    dispatch(userActions.setLoading(true))
    try {
      const { user: { address, chainId } } = getState()
      if (!chainId) {
        return alert('chainId is not provided')
      }
      const alchemy = new Alchemy({
        apiKey: REACT_APP_ALCHEMY_API_KEY,
        network: defineAlchemyNetwork(chainId)
      })

      const nfts = await alchemy.nft.getNftsForOwner(address)
      if (nfts.ownedNfts && nfts.ownedNfts.length > 0) {
        const ownedTokens = convertAlchemyTokens(nfts.ownedNfts as TAlchemyToken[])
        dispatch(userActions.setNFTTokens(ownedTokens))
      }
    } catch (err) {
      alert('Some error occured')
    }
    dispatch(userActions.setLoading(false))
  }
}

export default getNFTTokens
