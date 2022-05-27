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

const generateERC20Link = ({
  callback
}: { callback?: (id: string) => void  }) => {
  return async (
    dispatch: Dispatch<CampaignActions | UserActions | CampaignsActions>,
    getState: () => RootState
  ) => {
    const {
      user: {
        sdk,
        chainId,
        address
      },
      campaign: {
        id,
        assets,
        privateKey,
        tokenAddress,
        wallet,
        symbol,
        decimals,
        title,
        description,
        logoURL,
        proxyContractAddress,
        approved,
        secured,
        sponsored,
        type
      }
    } = getState()
    if (!assets) { return alert('assets are not provided') }
    if (!symbol) { return alert('symbol is not provided') }
    if (!tokenAddress) { return alert('tokenAddress is not provided') }
    if (!wallet) { return alert('wallet is not provided') }
    if (!id) { return alert('campaign id is not provided') }
    if (!privateKey) { return alert('privateKey is not provided') }
    let links: Array<TLink> = []
    for (let i = 0; i < assets.length; i++) {
      const result = await sdk?.generateLink({
        weiAmount: assets[0].nativeTokensAmount || '0',
        tokenAddress,
        wallet,
        tokenAmount: assets[0].amount || '0',
        expirationTime: EXPIRATION_DATE,
        campaignId: id,
        signingKeyOrWallet: privateKey
      })
      if (result) {
        links = [...links, {
          linkId: result?.linkId,
          content: !sponsored ? `${result?.url}&manual=true` : result?.url
        }]
        console.log({ links })
        dispatch(actionsCampaign.setLinks(links))
        await sleep(1)
      }
    }
    if (!decimals || !chainId || !proxyContractAddress || !privateKey || !type || !address) { return }

    const campaign: TCampaign = {
      id,
      assets,
      privateKey,
      tokenAddress,
      masterAddress: address,
      wallet,
      symbol,
      decimals,
      title: title || '',
      description: description || '',
      logoURL: logoURL || '',
      type,
      chainId,
      status: 'active',
      proxyContractAddress,
      approved,
      secured,
      sponsored,
      links,
      date: String(new Date())
    }

    dispatch(actionsCampaigns.addCampaign(campaign))
    dispatch(actionsCampaign.clearCampaign())
    if (callback) { callback(id) }
  }
}

export default generateERC20Link