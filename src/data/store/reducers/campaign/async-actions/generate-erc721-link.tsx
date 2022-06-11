import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions';
import * as actionsCampaigns from '../../campaigns/actions';
import { CampaignActions } from '../types';
import { UserActions } from '../../user/types'
import { RootState } from 'data/store'
import { TLink, TCampaign } from 'types'
import { EXPIRATION_DATE } from 'configs/app'
import { CampaignsActions } from '../../campaigns/types';
import { defineBatchPreviewContents } from 'helpers'

function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), timeout))
}

const generateERC721Link = ({
  callback,
  id: currentCampaignId
}: { callback?: (id: string) => void, id?: string  }) => {
  return async (
    dispatch: Dispatch<CampaignActions | UserActions | CampaignsActions>,
    getState: () => RootState
  ) => {
    
    let {
      user: {
        sdk,
        chainId,
        address
      },
      campaign,
      campaigns: { campaigns }
    } = getState()
    try {
      const {
        id,
        assets,
        signerKey,
        tokenAddress,
        wallet,
        symbol,
        title,
        proxyContractAddress,
        sponsored,
        type,
        signerAddress
      } = campaign
      if (!assets) { return alert('assets are not provided') }
      if (!symbol) { return alert('symbol is not provided') }
      if (!tokenAddress) { return alert('tokenAddress is not provided') }
      if (!wallet) { return alert('wallet is not provided') }
      if (!id) { return alert('campaign id is not provided') }
      if (!signerKey) { return alert('signerKey is not provided') }
      if (!signerAddress) { return alert('signerAddress is not provided') }
      let newLinks: Array<TLink> = []
      const date = String(new Date())
      for (let i = 0; i < assets.length; i++) {
        const result = await sdk?.generateLinkERC721({
          nftAddress: tokenAddress,
          wallet,
          expirationTime: EXPIRATION_DATE,
          campaignId: id,
          signingKeyOrWallet: signerKey,
          tokenId: assets[i].id || 0,
          weiAmount: assets[i].native_tokens_amount || '0'
        })
        if (result) {
          newLinks = [...newLinks, {
            link_id: result?.linkId,
            encrypted_link: !sponsored ? `${result?.url}&manual=true` : result?.url
          }]
          dispatch(actionsCampaign.setLinks(
            newLinks,
            date
          ))
          await sleep(1)
        }
      }
    
      if (!chainId || !proxyContractAddress || !signerKey || !type || !address) { return }
      
      const updatingCampaign = currentCampaignId ? campaigns.find(item => item.id === currentCampaignId) : undefined
      const batchPreviewContents = defineBatchPreviewContents(
        type,
        assets,
        symbol,
        chainId
      )
      const batch = {
        claim_links: newLinks,
        date,
        sponsored,
        batch_description: batchPreviewContents
      }
      if (updatingCampaign) {
        const updatedCampaign = {
          ...updatingCampaign,
          batches: [
            ...updatingCampaign.batches,
            batch
          ]
        }
        const updatedCampaigns = campaigns.map(item => {
          if (item.id === updatedCampaign.id) {
            return updatedCampaign
          }
          return item
        })
  
        dispatch(actionsCampaigns.updateCampaigns(updatedCampaigns))
  
      } else {
        const newCampaign: TCampaign = {
          id,
          signer_key: signerKey,
          signer_address: signerAddress,
          token_address: tokenAddress,
          creator_address: address,
          wallet,
          symbol,
          decimals: 0,
          title: title || '',
          type,
          chain_id: chainId,
          proxy_contract_address: proxyContractAddress,
          batches: [batch],
          date
        }
    
        dispatch(actionsCampaigns.addCampaign(newCampaign))
      }
      dispatch(actionsCampaign.clearCampaign())
      if (callback) { callback(id) }
    } catch (err) {
      console.error('Some error occured', err)
    }
  }
}

export default generateERC721Link