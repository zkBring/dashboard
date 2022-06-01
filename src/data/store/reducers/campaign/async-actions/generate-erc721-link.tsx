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
      const result = await sdk?.generateLinkERC721({
        nftAddress: tokenAddress,
        wallet,
        expirationTime: EXPIRATION_DATE,
        campaignId: id,
        signingKeyOrWallet: privateKey,
        tokenId: assets[i].id || 0,
        weiAmount: assets[i].nativeTokensAmount || '0'
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
        links: [
          ...updatingCampaign.links,
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
        privateKey,
        tokenAddress,
        masterAddress: address,
        wallet,
        symbol,
        decimals: 0,
        title: title || '',
        description: description || '',
        logoURL: logoURL || '',
        type,
        chainId,
        status: 'active',
        proxyContractAddress,
        approved,
        secured,
        links: [{
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
  }
}

export default generateERC721Link