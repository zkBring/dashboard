import { FC, useEffect, useState } from 'react'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom'
import {
  AsideDivider,
  TableRow,
  TableText,
  TableValue,
  WidgetComponent,
  Container,
  WidgetContainer
} from 'components/pages/common'
import {
  Header,
  WidgetButton,
  WidgetTitleStyled,
  AsideStyled,
  AsideContainer,
  AsideButton,
  AsideButtonsContainer
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
  BatchesList,
  CampaignParameters,
  HowToUseSDK,
  LinksStats,
  Settings
} from './components'
import { TextLink } from 'components/common'
import Icons from 'icons'
import { useHistory } from 'react-router-dom'
import {
  getCampaignBatches,
  downloadLinks,
  downloadReport,
  updateAvailableCountriesOn,
  updateClaimingFinishedButtonOn,
  updateClaimingFinishedButton,
  updateAvailableCountries
} from 'data/store/reducers/campaigns/async-actions'
import { IProps } from './types'
import { IAppDispatch } from 'data/store'
import { decrypt } from 'lib/crypto'
import { plausibleApi } from 'data/api'
import { TClaimPattern, TCountry, TTokenType } from 'types'
import wallets from 'configs/wallets'

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
  campaign: { decimals },
}: RootState) => ({
  campaigns,
  address,
  countries,
  decimals,
  loading,
  dashboardKey,
  signer,
  provider: jsonRPCProvider,
  chainId
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    getCampaignBatches: (campaign_id: string | number) => {
      dispatch(
        getCampaignBatches({ campaign_id })
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
      callback?: () => void
    ) => {
      dispatch(
        updateClaimingFinishedButton(
          campaign_id,
          claiming_finished_button_title,
          claiming_finished_button_href,
          callback
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
      availableWallets: string[],
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
          availableWallets,
          encryptionKey
        )
      )
    }
  }
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

type TCampaignStatus = 'paused' | 'pending' | 'active' | 'initial'

const CampaignDetails: FC<ReduxType & IProps & RouteComponentProps> = ({
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
  updateAvailableCountries
}) => {

  const history = useHistory()

  const [ status, setStatus ] = useState<TCampaignStatus>('initial')
  const [ withdrawable, setWithdrawable ] = useState<boolean>(false)

  useEffect(() => {
    getCampaignBatches(params.id)
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

  useEffect(() => {
    const onInit = async () => {
      const status = await defineCampaignStatus(
        proxy_contract_address,
        signer
      )
      setStatus(status)
    }
    onInit()
  }, [])
  
  // @ts-ignore
  const currentCampaign = campaigns.find(campaign => campaign.campaign_id === params.id)

  if (!currentCampaign || !dashboardKey) {
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
    encrypted_signer_key,
    wallet,
    sponsored,
    links_claimed,
    available_countries_on,
    available_wallets,
    available_countries,
    expiration_date,
    claiming_finished_button_title,
    claiming_finished_button_url,
    claiming_finished_button_on
  } = currentCampaign

  const encryptionKey = createEncryptionKey(
    dashboardKey,
    signer_address,
    campaign_number
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
                plausibleApi.invokeEvent({
                  eventName: 'camp_pause',
                  data: {
                    network: defineNetworkName(chain_id),
                    token_type: token_standard as string,
                    claim_pattern: claim_pattern,
                    distribution: sdk ? 'sdk' : 'manual',
                    preferred_wallet: currentCampaign.wallet
                  }
                })
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
                plausibleApi.invokeEvent({
                  eventName: 'camp_unpause',
                  data: {
                    network: defineNetworkName(chain_id),
                    token_type: token_standard as string,
                    claim_pattern: claim_pattern,
                    distribution: sdk ? 'sdk' : 'manual',
                    preferred_wallet: currentCampaign.wallet
                  }
                })
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
                plausibleApi.invokeEvent({
                  eventName: 'camp_refund',
                  data: {
                    network: defineNetworkName(chain_id),
                    token_type: token_standard as string,
                    claim_pattern: claim_pattern,
                    distribution: sdk ? 'sdk' : 'manual',
                    preferred_wallet: currentCampaign.wallet
                  }
                })
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

  const defineStatusTitle = () => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'initial':
        return '-'
      case 'paused':
        return 'Paused'
      case 'pending':
        return 'Pending'
    }
  }

  return <Container>
    
    <WidgetContainer>

      <LinksStats
        linksAmount={links_count}
        linksClaimed={links_claimed}
        sponsored={sponsored}
      />

      <WidgetComponent>
        <Header>
          <WidgetTitleStyled>{title || `Campaign ${campaign_id}`}</WidgetTitleStyled>
          {!sdk && <WidgetButton
            appearance='additional'
            size='extra-small'
            title='+ Add batch'
            onClick={() => {
              history.push(`/campaigns/edit/${token_standard}/${campaign_id}/new`)
            }}
          />}
        </Header>

        <BatchesList
          batches={batches}
          sponsored={sponsored}
          title={title}
          campaignId={campaign_id}
          sdk={sdk}
          downloadLinks={(
            batchId,
            campaignId,
            title,
            tokenAddress,
            sponsored,
            encryptionKey
          ) => {
            downloadLinks(
              batchId,
              campaignId,
              title,
              tokenAddress,
              chain_id,
              token_standard,
              sdk,
              sponsored,
              claim_pattern,
              wallet,
              available_wallets,
              encryptionKey
            )
          }}
          encryptionKey={encryptionKey}
          tokenAddress={token_address}
          linksCreated={links_count}
        />
        
      </WidgetComponent>

      <CampaignParameters
        campaignId={campaign_id}
        chainId={chain_id}
        encryptionKey={encryptionKey}
        sdk={sdk}
        masterAddress={creator_address}
        signingKey={decrypt(encrypted_signer_key, dashboardKey)}
      />
      <HowToUseSDK sdk={sdk} />
    </WidgetContainer>
    
    <AsideContainer>
      <AsideStyled
        title="Campaign"
        options={defineOptions()}
        loading={status === 'pending' || status === 'initial'}
      >
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
        {status !== null && <TableRow>
          <TableText>Status</TableText>
          <TableValue>{defineStatusTitle()}</TableValue>
        </TableRow>}

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

        {sponsored && <AsideButtonsContainer>
          <AsideButton
            onClick={() => downloadReport(campaign_id)}
          >
            <Icons.DownloadReportIcon />
            Download full report
          </AsideButton>
        </AsideButtonsContainer>}
        
      </AsideStyled>

      {sdk && <AsideStyled
        title="Resources"
        subtitle='Guides on how to install and run Linkdrop SDK'
      >
       <AsideButton
          onClick={() => {
            plausibleApi.invokeEvent({
              eventName: 'view_docs',
              data: {
                network: defineNetworkName(chainId),
                component: 'campaign_details'
              }
            })
            window.open(`https://docs.linkdrop.io/sdk`, '_blank')
          }}
        >
          Read Docs
        </AsideButton>
      </AsideStyled>}


      <Settings
        loading={loading}
        countries={countries}
        campaignData={currentCampaign}
        availableWalletsValue={available_wallets}
        availableCountriesValue={available_countries.map(currentCountry => {
          const country = countries.find(country => country.id === currentCountry)
          return country
        }).filter(item => item) as TCountry[]}
        preferredWalletValue={wallet}
        availableCountriesSubmit={(
          value,
          onSuccess,
          onError
        ) => {
          updateAvailableCountries(
            campaign_id,
            value,
            onSuccess
          )
        }}
          
      
        walletsSubmit={(
          availableWalletsValue,
          wallets,
          onSuccess,
          onError,
        ) => {}}

        finalScreenButtonSubmit={(
          buttonTitle,
          buttonHref,
          onSuccess,
          onError,
        ) => {
          updateClaimingFinishedButton(
            campaign_id,
            buttonTitle,
            buttonHref,
            onSuccess
          )
        }}
      
        buttonTitleValue={claiming_finished_button_title || ''}
        buttonHrefValue={claiming_finished_button_url || ''}

        finalScreenButtonToggleAction={(value) => {
          updateClaimingFinishedButtonOn(campaign_id, value)
        }}

        availableCountriesToggleAction={(value) => {
          updateAvailableCountriesOn(campaign_id, value)
        }}

        finalScreenButtonToggleValue={claiming_finished_button_on}

        availableCountriesToggleValue={available_countries_on}
      
      />
    </AsideContainer>
  </Container>
}

export default withRouter(connect(mapStateToProps, mapDispatcherToProps)(CampaignDetails))
