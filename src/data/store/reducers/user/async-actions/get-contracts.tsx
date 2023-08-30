import { Dispatch } from 'redux'
import * as userActions from 'data/store/reducers/user/actions'
import {
  UserActions
} from '../types'
import {
  CampaignActions
} from 'data/store/reducers/campaign/types'
import { RootState } from 'data/store'
import { Alchemy, NftFilters } from 'alchemy-sdk'
import { TNFTContract } from 'types'
import { defineAlchemyNetwork, alertError } from 'helpers'
import { getMnemonicCollections } from 'data/api'
import { convertMnemonicContracts } from 'helpers'
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
        return alertError('chainId is not provided')
      }

      const network = defineAlchemyNetwork(chainId)
      if (network) {
        const alchemy = new Alchemy({
          apiKey: REACT_APP_ALCHEMY_API_KEY,
          network
        })
  
        const filters = chainId === 1 || chainId === 137 ? {
          excludeFilters: [ NftFilters.SPAM]
        } : undefined
  
        const { contracts } = await alchemy.nft.getContractsForOwner(address, filters)
        if (contracts) {
          dispatch(userActions.setContracts(contracts as TNFTContract[]))
        }
      } else if (chainId === 8453) {
        const response = await getMnemonicCollections(
          chainId,
          address
        )
        if (response) {
          const { data: { nfts } } = response
          const contracts = convertMnemonicContracts(nfts)
          console.log({ contracts })
        }
      }
      
    } catch (err) {
      alertError('Check console for more information')
      console.error({ err })
    }
    dispatch(userActions.setLoading(false))
  }
}

export default getContracts
