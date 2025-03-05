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
  downloadReport
} from 'data/store/reducers/campaigns/async-actions'

import * as userAsyncActions from 'data/store/reducers/user/async-actions/index'
import {
  createReclaimAndAddLinks
} from 'data/store/reducers/dispensers/async-actions'
import { TextLink } from 'components/common'
import { IProps } from './types'
import { IAppDispatch } from 'data/store'

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
    loading: campaignLoading,
    approved
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
  chainId,
  approved
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
  downloadReport,
  signer,
  address,
  provider,
  chainId,
  countries,
  loading,
  approved
}) => {

  const history = useHistory()

  const [status, setStatus] = useState<TCampaignStatus>('initial')
  const [approving, setApproving] = useState<boolean>(false)

  const [withdrawable, setWithdrawable] = useState<boolean>(false)

  console.log({ campaigns, params })

  // @ts-ignore
  const currentCampaign = campaigns.find(campaign => campaign.campaign_id === params.id)

  console.log({ currentCampaign })
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

      <TableRow>
        <TableText>Status</TableText>
        <TableValue>
          {approved ? 'Approved' : 'Not approved'}
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
