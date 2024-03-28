
import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions'
import * as actionsUser from '../../user/actions'
import { CampaignActions } from '../types'
import { UserActions } from '../../user/types'
import { TNFTToken, TTokenType } from 'types'
import { IAppDispatch } from 'data/store'
import { Alchemy } from 'alchemy-sdk'
import { defineAlchemyNetwork, defineNetworkName, alertError } from 'helpers'
import { RootState } from 'data/store'
import { getMnemonicCollections } from 'data/api'
import { convertMnemonicNFTs } from 'helpers'
import chains from 'configs/chains';
const { REACT_APP_ALCHEMY_API_KEY } = process.env

function getUserNFTs(
  tokenStandard: TTokenType
) {

  // @ts-ignore
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
        const chainConfig = chains[chainId]
        if (network && chainConfig.alchemySupport) {
          const alchemy = new Alchemy({
            apiKey: REACT_APP_ALCHEMY_API_KEY,
            network
          })
      
          const { ownedNfts } = await alchemy.nft.getNftsForOwner(address, {
            contractAddresses: [ tokenAddress ]
          })

          const nfts = ownedNfts.map(nft => {
            return {
              title: nft.name || 'No title',
              tokenType: nft.tokenType as TTokenType,
              tokenId: nft.tokenId,
              balance: nft.balance,
              media: [{
                bytes: nft.image.size,
                gateway: nft.image.pngUrl || nft.image.thumbnailUrl || ''
              }]
            }
          })

          dispatch(actionsUser.setNFTs(nfts))
        } else if (chainConfig.mnemonicSupport) {
          const response = await getMnemonicCollections(
            chainId,
            address
          )
          if (response) {
            const { data: { nfts } } = response
            const nftsConverted = convertMnemonicNFTs(nfts, tokenAddress)
            dispatch(actionsUser.setNFTs(nftsConverted as TNFTToken[]))
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
