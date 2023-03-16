import { Dispatch } from 'redux'
import * as userActions from 'data/store/reducers/user/actions'
import {
  UserActions
} from '../types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import { RootState } from 'data/store'
import { Alchemy } from 'alchemy-sdk'
import { TAlchemyContract } from 'types'
import { defineAlchemyNetwork } from 'helpers'
const { REACT_APP_ALCHEMY_API_KEY } = process.env

const getContracts = () => {
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

      const { contracts } = await alchemy.nft.getContractsForOwner(address)
      if (contracts && contracts.length > 0) {
        dispatch(userActions.setContracts(contracts as TAlchemyContract[]))
      }
    } catch (err) {
      alert('Some error occured')
    }
    dispatch(userActions.setLoading(false))
  }
}

export default getContracts
