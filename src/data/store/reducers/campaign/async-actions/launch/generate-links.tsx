import { Dispatch } from 'redux'
import * as actionsCampaign from '../../actions'
import * as actionsAsyncCampaigns from '../../../campaigns/async-actions'
import { CampaignActions } from '../../types'
import { UserActions } from '../../../user/types'
import { RootState, IAppDispatch } from 'data/store'
import { TCampaignNew, TCampaign } from 'types'
import { CampaignsActions } from '../../../campaigns/types'
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
import * as campaignsActions from '../../../campaigns/actions'

const generateERC20Link = async (
  dispatch: Dispatch<CampaignActions | UserActions | CampaignsActions> & IAppDispatch,
  getState: () => RootState,
  callback?: (id: string) => void,
) => {
  let {
    user: {
      chainId,
      address,
      workersCount,
      signer,
      dashboardKey
    },
    campaign,
    campaigns: { campaigns }
  } = getState()

  let currentPercentage = 0
  const {
    id,
    assets,
    signerKey,
    signerAddress,
    tokenAddress,
    wallet,
    symbol,
    title,
    description,
    proxyContractAddress,
    sponsored,
    tokenStandard,
    claimPattern,
    sdk,
    nativeTokensPerLink,
    countriesWhitelist,
    expirationDate,
    preferredWalletOn,
    collectionId,
    collectionTokenId,
    countriesWhitelistOn,
    additionalWalletsOn
  } = campaign

  if (!assets) { return alertError('assets are not provided') }
  if (!chainId) { return alertError('assets are not provided') }
  if (!symbol) { return alertError('symbol is not provided') }
  if (!tokenAddress) { return alertError('tokenAddress is not provided') }
  // if (!wallet) { return alertError('wallet is not provided') }
  if (!id) { return alertError('campaign id is not provided') }
  if (!signerKey) { return alertError('signerKey is not provided') }
  if (!signerAddress) { return alertError('signerAddress is not provided') }
  if (!tokenStandard) { return alertError('tokenStandard is not provided') }

  const start = +(new Date())
  const neededWorkersCount = assets.length <= 1000 ? 1 : workersCount

  const updateProgressbar = async (value: number) => {
    if (value === currentPercentage || value < currentPercentage) { return }
    currentPercentage = value
    dispatch(actionsCampaign.setLinksGenerateLoader(currentPercentage))
    await sleep(1)
  }

  const assetsGroups = createDataGroups(sdk ? [] : assets, neededWorkersCount)
  const workers = await createWorkers(assetsGroups, 'links', updateProgressbar)

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


    if (!signerKey || !tokenStandard || !address) { return }

    
    const batchLinks= newLinks.flat()
    const batch = {
      claim_links: batchLinks.length === 0 ? undefined : newLinks.flat(),
      batch_description: 'legacy property'
    }
    
    const newCampaign: TCampaignNew = {
      campaign_number: id,
      encrypted_signer_key: encrypt(signerKey, dashboardKey as string),
      signer_address: signerAddress,
      token_address: tokenAddress,
      creator_address: address,
      wallet: 'coinbase_wallet',
      sdk,
      symbol,
      title: title || '',
      description: description || '',
      token_standard: tokenStandard,
      chain_id: String(chainId),
      proxy_contract_address: proxyContractAddress,
      claim_pattern: claimPattern,
      proxy_contract_version: version,
      sponsored,
      available_countries: countriesWhitelist,
      available_countries_on: countriesWhitelistOn,
      preferred_wallet_on: preferredWalletOn,
      additional_wallets_on: additionalWalletsOn,
      collection_id: collectionId ? collectionId : undefined,
      collection_token_id: collectionTokenId ? collectionTokenId : undefined,
      claim_host: '',
      claim_host_on: false,
      multiple_claims_on: false,
      ...batch
    }

    const result = await campaignsApi.create(newCampaign)
    terminateWorkers(workers)
    if (result.data.success) {
      const { campaign, batch } = result.data

      dispatch(actionsAsyncCampaigns.removeCurrentCampaignFromDrafts())
      if (callback) {
        const campaigns: { data: { campaigns_array: TCampaign[] } } = await campaignsApi.get(chainId)
        dispatch(campaignsActions.updateCampaigns(campaigns.data.campaigns_array))
        callback(campaign.campaign_id)
      }

      return {
        campaign: campaign as TCampaign,
        batch
      }
    }

}

export default generateERC20Link