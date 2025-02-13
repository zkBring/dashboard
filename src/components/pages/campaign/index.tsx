import { FC, useEffect, useState } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import {
  AsideDivider,
  TableRow,
  TableText,
  TableValue,
  WidgetContainer
} from 'components/pages/common'
import {
  Header,
  WidgetTitleStyled,
  AsideStyled,
  WidgetComponent,
  AsideButton,
  AsideButtonsContainer,
  Container
} from './styled-components'
import {
  shortenString,
  defineNetworkName,
  defineExplorerUrl,
  defineCampaignStatus,
  campaignPause,
  campaignUnpause,
  campaignRefund,
  copyToClipboard,
  defineContractFunds,
  createEncryptionKey,
  formatDate,
  formatTime
} from 'helpers'
import {
  LinksStats,
  Reclaim
} from './components'
import Icons from 'icons'
import { useHistory } from 'react-router-dom'
import {
  getCampaignBatches,
  downloadLinks,
  downloadReport,
  updateAvailableCountriesOn,
  updateClaimingFinishedButtonOn,
  updateClaimingFinishedButton,
  updateAvailableCountries,
  updateWallets,
  updatePreferredWalletOn,
  updateClaimHost,
  updateClaimHostOn,
  updateMultipleClaimsOn
} from 'data/store/reducers/campaigns/async-actions'

import {
  createNewBatch
} from 'data/store/reducers/campaign/async-actions'

import {
  createReclaimAndAddLinks
} from 'data/store/reducers/dispensers/async-actions'
import { TextLink } from 'components/common'
import { IProps } from './types'
import { IAppDispatch } from 'data/store'
import { TClaimPattern, TCountry, TTokenType } from 'types'

const mapStateToProps = ({
  campaigns: {
    campaigns,
    loading
  },
  user: {
    address,
    dashboardKey,
    signer,
    jsonRPCProvider,
    chainId,
    countries
  },
  campaign: {
    decimals,
    loading: campaignLoading
  },
}: RootState) => ({
  campaigns,
  address,
  countries,
  decimals,
  campaignLoading,
  loading,
  dashboardKey,
  signer,
  provider: jsonRPCProvider,
  chainId
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    getCampaignBatches: (
      campaign_id: string | number,
      callback: () => Promise<void>
    ) => {
      dispatch(
        getCampaignBatches({ campaign_id, callback })
      )
    },

    downloadReport: (
      campaign_id: string
    ) => {
      dispatch(
        downloadReport(
          campaign_id
        )
      )
    },

    updateAvailableCountriesOn: (
      campaign_id: string,
      available_countries_on: boolean
    ) => {
      dispatch(
        updateAvailableCountriesOn(
          campaign_id,
          available_countries_on
        )
      )
    },

    updatePreferredWalletOn: (
      campaign_id: string,
      preferred_wallet_on: boolean
    ) => {
      dispatch(
        updatePreferredWalletOn(
          campaign_id,
          preferred_wallet_on
        )
      )
    },

    updateAvailableCountries: (
      campaign_id: string,
      available_countries: string[],
      callback?: () => void
    ) => {
      dispatch(
        updateAvailableCountries(
          campaign_id,
          available_countries,
          callback
        )
      )
    },

    updateWallet: (
      campaign_id: string,
      wallet: string,
      additional_wallets_on: boolean,
      callback?: () => void
    ) => {
      dispatch(
        updateWallets(
          campaign_id,
          wallet,
          additional_wallets_on,
          callback
        )
      )
    },

    createReclaimAndAddLinks: (
      mappingPageRedirect: () => void,
      title: string,
      campaignId: string,
      batchId: string,
      tokenAddress: string,
      wallet: string,
      tokenType: TTokenType,
      customClaimHost: string,
      customClaimHostOn: boolean,
      successCallback?: (
        reclaim_id: string | number
      ) => void,
      errorCallback?: () => void,
    ) => {
      dispatch(
        createReclaimAndAddLinks({
          mappingPageRedirect,
          title,
          campaignId,
          batchId,
          tokenAddress,
          wallet,
          tokenType,
          customClaimHost,
          customClaimHostOn,
          successCallback,
          errorCallback
        })
      )
    },

    
    updateClaimingFinishedButtonOn: (
      campaign_id: string,
      claiming_finished_button_on: boolean
    ) => {
      dispatch(
        updateClaimingFinishedButtonOn(
          campaign_id,
          claiming_finished_button_on
        )
      )
    },

    updateClaimingFinishedButton: (
      campaign_id: string,
      claiming_finished_button_title: string,
      claiming_finished_button_href: string,
      claiming_finished_auto_redirect: boolean,
      callback?: () => void
    ) => {
      dispatch(
        updateClaimingFinishedButton(
          campaign_id,
          claiming_finished_button_title,
          claiming_finished_button_href,
          claiming_finished_auto_redirect,
          callback
        )
      )
    },


    createNewBatch: (
      campaign_id: string,
      token_standard: TTokenType,
      callback?: (location: string) => void
    ) => {
      dispatch(
        createNewBatch(
          campaign_id,
          token_standard,
          callback
        )
      )
    },


    updateClaimHost: (
      campaign_id: string,
      claim_host: string,
      callback?: () => void
    ) => {
      dispatch(
        updateClaimHost(
          campaign_id,
          claim_host,
          callback
        )
      )
    },

    updateClaimHostOn: (
      campaign_id: string,
      claim_host_on: boolean,
    ) => {
      dispatch(
        updateClaimHostOn(
          campaign_id,
          claim_host_on
        )
      )
    },

    updateMultipleClaimsOn: (
      campaign_id: string,
      multiple_claims_on: boolean,
    ) => {
      dispatch(
        updateMultipleClaimsOn(
          campaign_id,
          multiple_claims_on
        )
      )
    },

    downloadLinks: (
      batch_id: string | number,
      campaign_id: string,
      title: string,
      tokenAddress: string | null,
      chainId: number,
      tokenType: TTokenType,
      sdk: boolean,
      sponsored: boolean,
      claimPattern: TClaimPattern,
      wallet: string,
      customClaimHost: string,
      customClaimHostOn: boolean,
      encryptionKey?: string
    ) => {
      dispatch(
        downloadLinks(
          batch_id,
          campaign_id,
          title,
          tokenAddress,
          chainId,
          tokenType,
          sdk,
          sponsored,
          claimPattern,
          wallet,
          customClaimHost,
          customClaimHostOn,
          encryptionKey
        )
      )
    }
  }
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

type TCampaignStatus = 'paused' | 'pending' | 'active' | 'initial'

const Campaign: FC<ReduxType & IProps & RouteComponentProps> = ({
  campaigns,
  dashboardKey,
  match: { params },
  getCampaignBatches,
  downloadLinks,
  downloadReport,
  signer,
  address,
  provider,
  chainId,
  countries,
  loading,
  updateClaimingFinishedButtonOn,
  updateAvailableCountriesOn,
  updateClaimingFinishedButton,
  updateAvailableCountries,
  updateWallet,
  updatePreferredWalletOn,
  updateClaimHost,
  updateClaimHostOn,
  updateMultipleClaimsOn,
  createNewBatch,
  createReclaimAndAddLinks,
  campaignLoading
}) => {

  const history = useHistory()

  const [status, setStatus] = useState<TCampaignStatus>('initial')
  const [withdrawable, setWithdrawable] = useState<boolean>(false)


  useEffect(() => {
    getCampaignBatches(
      params.id,
      async () => {
        const status = await defineCampaignStatus(
          proxy_contract_address,
          signer,
        )
        setStatus(status)
      }
    )
  }, [])

  useEffect(() => {
    const onInit = async () => {
      const amount = await defineContractFunds(
        proxy_contract_address,
        provider
      )
      setWithdrawable(amount > 0)
    }
    onInit()
  }, [])

  // @ts-ignore
  const currentCampaign = campaigns.find(campaign => campaign.campaign_id === params.id)

  if (!currentCampaign) {
    return null
  }

  const {
    campaign_id,
    token_standard,
    title,
    batches,
    creator_address,
    token_address,
    proxy_contract_address,
    claim_pattern,
    chain_id,
    links_count,
    sdk,
    signer_address,
    campaign_number,
    additional_wallets_on,
    encrypted_signer_key,
    wallet,
    sponsored,
    links_claimed,
    available_countries_on,
    available_countries,
    collection_id,
    expiration_date,
    claiming_finished_button_title,
    claiming_finished_button_url,
    claiming_finished_button_on,
    claiming_finished_auto_redirect,
    preferred_wallet_on,
    claim_host,
    claim_host_on,
    multiple_claims_on,
    token_id
    
  } = currentCampaign

  const encryptionKey = createEncryptionKey(
    signer_address,
    campaign_number,
    dashboardKey
  )

  const tokenUrl = defineExplorerUrl(Number(chain_id), `/address/${token_address || ''}`)
  const ownerUrl = defineExplorerUrl(Number(chain_id), `/address/${creator_address || ''}`)
  const contractUrl = defineExplorerUrl(Number(chain_id), `/address/${proxy_contract_address || ''}`)
  const copyToClipboardButton = {
    title: 'Copy debug data',
    icon: <Icons.ClipboardCopyIcon />,
    action: () => {
      copyToClipboard({
        value: {
          chainId: currentCampaign.chain_id,
          proxyAddress: currentCampaign.proxy_contract_address,
          campaignNumber: currentCampaign.campaign_number,
          creatorAddress: currentCampaign.creator_address,
          paused: String(status),
          tokenAddress: currentCampaign.token_address,
          type: currentCampaign.token_standard,
          pattern: currentCampaign.claim_pattern,
          createdAt: currentCampaign.created_at
        }
      })
    }
  }


  const defineOptions = () => {
    if (status === 'active') {
      return [
        {
          title: 'Pause',
          icon: <Icons.PauseIcon />,
          action: async () => {
            try {
              setStatus('pending')
              const result = await campaignPause(
                proxy_contract_address,
                address,
                signer
              )
              if (result === 'paused') {
                setStatus('paused')
              }
            } catch (e) {
              setStatus('active')
              console.error(e)
            }
          }
        },
        {
          title: 'Refund',
          icon: <Icons.RefundIcon />,
          disabled: true,
          bordered: true
        },
        copyToClipboardButton
      ]
    }

    if (status === 'paused') {
      return [
        {
          title: 'Unpause',
          icon: <Icons.UnpauseIcon />,
          action: async () => {
            try {
              setStatus('pending')
              const result = await campaignUnpause(
                proxy_contract_address,
                address,
                signer
              )
              if (result === 'active') {
                setStatus('active')
              }
            } catch (e) {
              setStatus('paused')
              console.error(e)
            }
          }
        },
        {
          title: 'Refund',
          icon: <Icons.RefundIcon />,
          bordered: true,
          disabled: !withdrawable,
          action: async () => {
            const currentStatus = status
            try {
              setStatus('pending')
              const result = await campaignRefund(
                proxy_contract_address,
                address,
                signer,
                provider
              )
              if (result) {
                setWithdrawable(false)
                setStatus(currentStatus)
              }
            } catch (e) {
              setStatus(currentStatus)
              console.error(e)
            }
          }
        },
        copyToClipboardButton
      ]
    }
    return []
  }

  const currentBatch = batches && batches[0]

  return <Container>
    <WidgetContainer>
      <LinksStats
        linksAmount={links_count}
        linksClaimed={links_claimed}
        sponsored={sponsored}
      />

      <WidgetComponent>
        <Header>
          <WidgetTitleStyled>{title || ` ${campaign_id}`}</WidgetTitleStyled>
        </Header>
        <Reclaim
          reclaimId={currentBatch && currentBatch.qr_campaign}
        />

      </WidgetComponent>

    </WidgetContainer>

    <AsideStyled
      title="Campaign"
      options={defineOptions()}
      loading={status === 'pending' || status === 'initial'}
    >
      {currentBatch &&currentBatch.created_at && <TableRow>
        <TableText>Created at</TableText>
        <TableValue>
          {formatDate(currentBatch.created_at as string)}, {formatTime(currentBatch.created_at as string)}
        </TableValue>
      </TableRow>}
      {expiration_date && <TableRow>
        <TableText>Expiration date</TableText>
        <TableValue>
          {formatDate(expiration_date)}, {formatTime(expiration_date)}
        </TableValue>
      </TableRow>}
      <TableRow>
        <TableText>Created by</TableText>
        <TableValue>
          {ownerUrl ? <TextLink href={ownerUrl} target='_blank'>{shortenString(creator_address)}</TextLink> : shortenString(creator_address)}
        </TableValue>
      </TableRow>
      <AsideDivider />

      <TableRow>
        <TableText>Token address</TableText>
        <TableValue>
          {tokenUrl ? <TextLink href={tokenUrl} target='_blank'>{shortenString(token_address)}</TextLink> : shortenString(token_address)}
        </TableValue>
      </TableRow>

      <TableRow>
        <TableText>Campaign contract</TableText>
        <TableValue>
          {contractUrl ? <TextLink href={contractUrl} target='_blank'>{shortenString(proxy_contract_address)}</TextLink> : shortenString(proxy_contract_address)}
        </TableValue>
      </TableRow>

      <AsideDivider />

      <TableRow>
        <TableText>Claim pattern</TableText>
        <TableValue>{claim_pattern}</TableValue>
      </TableRow>

      <AsideDivider />

      <TableRow>
        <TableText>Network</TableText>
        <TableValue>{defineNetworkName(Number(chain_id))}</TableValue>
      </TableRow>
      <TableRow>
        <TableText>Token standard</TableText>
        <TableValue>{token_standard}</TableValue>
      </TableRow>
      <TableRow>
        <TableText>Sponsorship</TableText>
        <TableValue>{sponsored ? 'Enabled' : 'Disabled'}</TableValue>
      </TableRow>

      <AsideButtonsContainer>
        <AsideButton
          onClick={() => downloadReport(campaign_id)}
        >
          Download full report
        </AsideButton>
      </AsideButtonsContainer>

    </AsideStyled>
      
  </Container>
}

// @ts-ignore
export default withRouter(connect(mapStateToProps, mapDispatcherToProps)(Campaign))
