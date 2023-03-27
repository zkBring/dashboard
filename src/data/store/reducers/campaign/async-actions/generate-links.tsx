import { Dispatch } from 'redux';
import * as actionsCampaign from '../actions';
import * as actionsCampaigns from '../../campaigns/actions';
import { CampaignActions } from '../types';
import { UserActions } from '../../user/types'
import { RootState } from 'data/store'
import { TCampaignNew } from 'types'
import { CampaignsActions } from '../../campaigns/types'
import { defineBatchPreviewContents } from 'helpers'
import { campaignsApi } from 'data/api'
import { encrypt } from 'lib/crypto'
import {
  sleep,
  createDataGroups,
  createWorkers,
  terminateWorkers,
  getContractVersion
} from 'helpers'
import { Remote } from 'comlink';
import { LinksWorker } from 'web-workers/links-worker'
import { plausibleApi } from 'data/api'
import { defineNetworkName } from 'helpers'

const {
  REACT_APP_INFURA_ID,
  REACT_APP_CLAIM_APP
} = process.env

const generateERC20Link = ({
  callback,
  id: currentCampaignId
}: { callback?: (id: string) => void, id?: string  }) => {
  return async (
    dispatch: Dispatch<CampaignActions | UserActions | CampaignsActions>,
    getState: () => RootState
  ) => {
    
    let {
      user: {
        chainId,
        address,
        dashboardKey,
        workersCount,
        provider
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
        nativeTokensPerLink
      } = campaign

      if (!assets) { return alert('assets are not provided') }
      if (!chainId) { return alert('assets are not provided') }
      if (!symbol) { return alert('symbol is not provided') }
      if (!tokenAddress) { return alert('tokenAddress is not provided') }
      if (!wallet) { return alert('wallet is not provided') }
      if (!id) { return alert('campaign id is not provided') }
      if (!signerKey) { return alert('signerKey is not provided') }
      if (!signerAddress) { return alert('signerAddress is not provided') }
      if (!dashboardKey || dashboardKey === null) { return alert('dashboardKey is not provided') }
      if (!tokenStandard) { return alert('tokenStandard is not provided') }
      if (!REACT_APP_INFURA_ID) {
        return alert('REACT_APP_INFURA_ID is not provided in .env file')
      }

      if (!REACT_APP_CLAIM_APP) {
        return alert('REACT_APP_CLAIM_APP is not provided in .env file')
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
      const version = await getContractVersion(proxyContractAddress, provider)

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
        nativeTokensPerLink,
        dashboardKey !== null ? dashboardKey : '',
        proxyContractAddress,
        version
      )))


      console.log({ newLinks })
      console.log((+ new Date()) - start)

      if (!signerKey || !tokenStandard || !address) { return }
      const updatingCampaign = currentCampaignId ? campaigns.find(item => item.campaign_id === currentCampaignId) : undefined
      const batchPreviewContents = defineBatchPreviewContents(
        tokenStandard,
        assets,
        symbol,
        chainId
      )

      if (updatingCampaign && currentCampaignId) {
        const result = await campaignsApi.saveBatch(
          currentCampaignId,
          newLinks.flat(),
          sponsored,
          batchPreviewContents
        )

        if (result.data.success) {
          await plausibleApi.invokeEvent({
            eventName: 'batch_added',
            data: {
              network: defineNetworkName(chainId),
              token_type: tokenStandard as string,
              claim_pattern: claimPattern,
              distribution: sdk ? 'sdk' : 'manual',
              sponsorship: sponsored ? 'sponsored' : 'non sponsored',
              extra_token: nativeTokensPerLink !== '0' ? 'yes' : 'no',
              preferred_wallet: wallet
            }
          })
          const { campaign_id } = result.data
          if (callback) { callback(campaign_id) }
        }
    
      } else {
        const batchLinks= newLinks.flat()
        const batch = {
          claim_links: batchLinks.length === 0 ? undefined : newLinks.flat(),
          sponsored,
          batch_description: batchPreviewContents
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
          ...batch
        }

        const result = await campaignsApi.create(newCampaign)
        if (result.data.success) {
          const { campaign } = result.data

          dispatch(actionsCampaigns.addCampaign(campaign))
          await plausibleApi.invokeEvent({
            eventName: 'camp_created',
            data: {
              network: defineNetworkName(chainId),
              token_type: tokenStandard as string,
              claim_pattern: claimPattern,
              distribution: sdk ? 'sdk' : 'manual',
              sponsorship: sponsored ? 'sponsored' : 'non sponsored',
              extra_token: nativeTokensPerLink !== '0' ? 'yes' : 'no',
              preferred_wallet: wallet
            }
          })
          if (callback) {
            console.log('should call callback')
            callback(campaign.campaign_id)
          }
        }
      }
      terminateWorkers(workers)
      dispatch(actionsCampaign.clearCampaign())
    } catch (err) {
      alert('Error occured! Check console for more info')
      console.error('Some error occured', err)
    }
  }
}

export default generateERC20Link