import { Dispatch } from 'redux'
import * as actionsCampaign from '../actions'
import * as actionsCampaigns from '../../campaigns/actions'
import * as actionsAsyncCampaigns from '../../campaigns/async-actions'
import { CampaignActions } from '../types'
import { UserActions } from '../../user/types'
import { RootState, IAppDispatch } from 'data/store'
import { TCampaignNew, TCampaign } from 'types'
import { CampaignsActions } from '../../campaigns/types'
import { campaignsApi } from 'data/api'
import { encrypt } from 'lib/crypto'
import {
  sleep,
  createDataGroups,
  createWorkers,
  terminateWorkers,
  getContractVersion,
  alertError
} from 'helpers'
import { Remote } from 'comlink'
import { LinksWorker } from 'web-workers/links-worker'
import { plausibleApi } from 'data/api'
import { defineNetworkName } from 'helpers'
import * as campaignsActions from '../../campaigns/actions'

const {
  REACT_APP_INFURA_ID,
} = process.env

const generateERC20Link = ({
  callback,
  id: currentCampaignId
}: { callback?: (id: string) => void, id?: string  }) => {
  return async (
    dispatch: Dispatch<CampaignActions | UserActions | CampaignsActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    
    let {
      user: {
        chainId,
        address,
        dashboardKey,
        workersCount,
        signer
      },
      campaign,
      campaigns: { campaigns }
    } = getState()
  
    let currentPercentage = 0
    try {
      const {
        id,
        assets,
        signerKey,
        signerAddress,
        tokenAddress,
        wallet,
        symbol,
        title,
        proxyContractAddress,
        sponsored,
        tokenStandard,
        claimPattern,
        sdk,
        nativeTokensPerLink,
        availableWallets,
        expirationDate
      } = campaign

      if (!assets) { return alertError('assets are not provided') }
      if (!chainId) { return alertError('assets are not provided') }
      if (!symbol) { return alertError('symbol is not provided') }
      if (!tokenAddress) { return alertError('tokenAddress is not provided') }
      if (!wallet) { return alertError('wallet is not provided') }
      if (!id) { return alertError('campaign id is not provided') }
      if (!signerKey) { return alertError('signerKey is not provided') }
      if (!signerAddress) { return alertError('signerAddress is not provided') }
      if (!dashboardKey || dashboardKey === null) { return alertError('dashboardKey is not provided') }
      if (!tokenStandard) { return alertError('tokenStandard is not provided') }
      if (!REACT_APP_INFURA_ID) {
        return alertError('REACT_APP_INFURA_ID is not provided in .env file')
      }

      const start = +(new Date())
      const neededWorkersCount = assets.length <= 1000 ? 1 : workersCount

      const updateProgressbar = async (value: number) => {
        if (value === currentPercentage || value < currentPercentage) { return }
        currentPercentage = value
        dispatch(actionsCampaign.setLinksGenerateLoader(currentPercentage))
        await sleep(1)
      }

      const assetsGroups = createDataGroups(sdk ? [] : assets, neededWorkersCount)
      console.log({ assetsGroups })
      const workers = await createWorkers(assetsGroups, 'links', updateProgressbar)
      console.log({ workers })

      if (!proxyContractAddress || !chainId) { return }
      const version = await getContractVersion(proxyContractAddress, signer)

      const newLinks = await Promise.all(workers.map(({
        worker,
        data
      }) => (worker as Remote<LinksWorker>).generateLink(
        tokenStandard,
        address,
        Number(chainId),
        data,
        tokenAddress,
        signerKey,
        String(nativeTokensPerLink || '0'),
        dashboardKey !== null ? dashboardKey : '',
        proxyContractAddress,
        version,
        expirationDate
      )))


      console.log({ newLinks })
      console.log((+ new Date()) - start)

      if (!signerKey || !tokenStandard || !address) { return }
      const updatingCampaign = currentCampaignId ? campaigns.find(item => item.campaign_id === currentCampaignId) : undefined

      if (updatingCampaign && currentCampaignId) {
        const result = await campaignsApi.saveBatch(
          currentCampaignId,
          newLinks.flat(),
          'legacy property'
        )

        if (result.data.success) {
          plausibleApi.invokeEvent({
            eventName: 'batch_added',
            data: {
              network: defineNetworkName(chainId),
              token_type: tokenStandard as string,
              claim_pattern: claimPattern,
              distribution: sdk ? 'sdk' : 'manual',
              sponsorship: sponsored ? 'sponsored' : 'non sponsored',
              extra_token: !nativeTokensPerLink?.eq('0') ? 'yes' : 'no',
              preferred_wallet: wallet
            }
          })
          const { campaign_id } = result.data
          if (callback) {
            const campaigns: { data: { campaigns_array: TCampaign[] } } = await campaignsApi.get(chainId)
            dispatch(campaignsActions.updateCampaigns(campaigns.data.campaigns_array))
            callback(campaign_id)
          }
        }
    
      } else {
        const batchLinks= newLinks.flat()
        const batch = {
          claim_links: batchLinks.length === 0 ? undefined : newLinks.flat(),
          batch_description: 'legacy property'
        }
        
        const newCampaign: TCampaignNew = {
          campaign_number: id,
          encrypted_signer_key: encrypt(signerKey, dashboardKey),
          signer_address: signerAddress,
          token_address: tokenAddress,
          creator_address: address,
          wallet,
          sdk,
          symbol,
          title: title || '',
          token_standard: tokenStandard,
          chain_id: chainId,
          proxy_contract_address: proxyContractAddress,
          claim_pattern: claimPattern,
          proxy_contract_version: version,
          sponsored,
          available_wallets: availableWallets,
          ...batch
        }

        const result = await campaignsApi.create(newCampaign)
        if (result.data.success) {
          const { campaign } = result.data
          plausibleApi.invokeEvent({
            eventName: 'camp_created',
            data: {
              network: defineNetworkName(chainId),
              token_type: tokenStandard as string,
              claim_pattern: claimPattern,
              distribution: sdk ? 'sdk' : 'manual',
              sponsorship: sponsored ? 'sponsored' : 'non sponsored',
              extra_token: !nativeTokensPerLink?.eq('0') ? 'yes' : 'no',
              preferred_wallet: wallet
            }
          })
          dispatch(actionsAsyncCampaigns.removeCurrentCampaignFromDrafts())
          if (callback) {
            const campaigns: { data: { campaigns_array: TCampaign[] } } = await campaignsApi.get(chainId)
            dispatch(campaignsActions.updateCampaigns(campaigns.data.campaigns_array))
            callback(campaign.campaign_id)
          }
        }
      }
      terminateWorkers(workers)
      dispatch(actionsCampaign.clearCampaign())
    } catch (err) {
      alertError('Check console for more info')
      console.error('Some error occured', err)
    }
  }
}

export default generateERC20Link