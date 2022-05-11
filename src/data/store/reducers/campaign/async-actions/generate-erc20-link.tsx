import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions';
import { CampaignActions } from '../types';
import { UserActions } from '../../user/types'
import { RootState } from 'data/store'
import { TLink } from 'types'
import { EXPIRATION_DATE } from 'configs/app'
function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), timeout))
}

const generateERC20Link = () => {
  return async (
    dispatch: Dispatch<CampaignActions | UserActions>,
    getState: () => RootState
  ) => {
    const {
      user: {
        sdk
      },
      campaign: {
        id,
        assets,
        privateKey,
        tokenAddress,
        wallet,
        symbol,
        decimals
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
          linkId: result?.url,
          content: result?.linkId
        }]
        console.log({ links })
        dispatch(actionsCampaign.setLinks(links))
        await sleep(1)
      }
      
    }
    
  }
}

export default generateERC20Link