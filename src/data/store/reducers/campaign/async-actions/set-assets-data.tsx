
import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions';
import { CampaignActions } from '../types';
import { TTokenType, TAssetsData, TClaimPattern } from 'types'
import { ethers } from 'ethers'
import { ERC1155Contract } from 'abi'
import { replaceIPFS } from 'helpers'
import { IAppDispatch, RootState } from 'data/store'
import { getERC1155AssetData } from 'data/api'

function setAssetsData(
  tokenStandard: TTokenType,
  assets: TAssetsData,
  wallet: string,
  title: string,
  tokenAddress: string,
  claimPattern: TClaimPattern,
  callback?: () => void
) {
  return async (
    dispatch: Dispatch<CampaignActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    dispatch(actionsCampaign.setAssets(assets))
    dispatch(actionsCampaign.setTokenStandard(tokenStandard))
    dispatch(actionsCampaign.setWallet(wallet))
    dispatch(actionsCampaign.setTitle(title))
    dispatch(actionsCampaign.setClaimPattern(claimPattern))
    const { user: { provider } } = getState()
    try {
      if (tokenStandard === 'ERC1155') {
        const currentAsset = assets[0]
        if (currentAsset) {
          const tokenId = currentAsset.id
          if (tokenId) {
            const signer = await provider.getSigner()
            const contractInstance = await new ethers.Contract(tokenAddress, ERC1155Contract.abi, signer)
            const metadataURL: string = await contractInstance.uri(tokenId)
            if (metadataURL) {
              const finalMetadataUrl = replaceIPFS(metadataURL)
              const assetData = await getERC1155AssetData(finalMetadataUrl, String(tokenId))
              const { name } = assetData.data
              if (name) {
                dispatch(actionsCampaign.setSymbol(name))
              }
            }
          }
        }
      }
      if (callback) {
        callback()
      }
    } catch (err) {
      console.error({ err })
      dispatch(actionsCampaign.setSymbol('ERC1155'))
      if (callback) {
        callback()
      }
    }
  }
}

export default setAssetsData
