import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions';
import * as actionsCampaigns from '../../campaigns/actions';
import { CampaignActions } from '../types';
import { UserActions } from '../../user/types'
import { RootState } from 'data/store'
import { TLink, TCampaign } from 'types'
import { EXPIRATION_DATE } from 'configs/app'
import { CampaignsActions } from '../../campaigns/types';
function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), timeout))
}

const generateERC1155Link = ({
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
        privateKey,
        tokenAddress,
        wallet,
        symbol,
        title,
        description,
        logoURL,
        proxyContractAddress,
        approved,
        secured,
        sponsored,
        type
      } = campaign
      if (!assets) { return alert('assets are not provided') }
      if (!symbol) { return alert('symbol is not provided') }
      if (!tokenAddress) { return alert('tokenAddress is not provided') }
      if (!wallet) { return alert('wallet is not provided') }
      if (!id) { return alert('campaign id is not provided') }
      if (!privateKey) { return alert('privateKey is not provided') }
      let newLinks: Array<TLink> = []
      const date = String(new Date())
      for (let i = 0; i < assets.length; i++) {
        const result = await sdk?.generateLinkERC1155({
          weiAmount: assets[i].native_tokens_amount || '0',
          nftAddress: tokenAddress,
          wallet,
          tokenId: assets[i].id || '0',
          tokenAmount: assets[i].amount || '0',
          expirationTime: EXPIRATION_DATE,
          campaignId: id,
          signingKeyOrWallet: privateKey
        })
        if (result) {
          newLinks = [...newLinks, {
            linkId: result?.linkId,
            content: !sponsored ? `${result?.url}&manual=true` : result?.url
          }]
          dispatch(actionsCampaign.setLinks(
            newLinks,
            date
          ))
          await sleep(1)
        }
      }
  
      if (!chainId || !proxyContractAddress || !privateKey || !type || !address) { return }
  
      const updatingCampaign = currentCampaignId ? campaigns.find(item => item.id === currentCampaignId) : undefined
      if (updatingCampaign) {
        const updatedCampaign = {
          ...updatingCampaign,
          assets: [
            ...updatingCampaign.assets,
            ...assets
          ],
          batches: [
            ...updatingCampaign.batches,
            {
              links: newLinks,
              date,
              sponsored
            }
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
          assets,
          signer_key: privateKey,
          token_address: tokenAddress,
          creator_address: address,
          wallet,
          symbol,
          decimals: 0,
          title: title || '',
          type,
          chain_id: chainId,
          proxy_contract_address: proxyContractAddress,
          batches: [{
            links: newLinks,
            date,
            sponsored
          }],
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

export default generateERC1155Link