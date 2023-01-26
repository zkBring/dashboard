import { FC, useEffect, useState } from 'react'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom'
import {
  AsideDivider,
  AsideRow,
  AsideText,
  AsideValue,
  BatchList,
  BatchListLabel,
  BatchListValue,
  WidgetComponent,
  Container,
  Aside
} from 'components/pages/common'

import {
  Header,
  WidgetButton,
  WidgetTitleStyled,
  SecondaryTextSpan
} from './styled-components'

import {
  shortenString,
  defineNetworkName,
  defineEtherscanUrl,
  formatTime,
  formatDate,
  defineCampaignStatus,
  campaignPause,
  campaignUnpause,
  campaignRefund,
  copyToClipboard,
  defineProxyContractFunds
} from 'helpers'
import { TextLink } from 'components/common'
import Icons from 'icons';

import { useHistory } from 'react-router-dom'
import { getCampaignBatches, downloadLinks } from 'data/store/reducers/campaigns/async-actions'
import { IProps } from './types'
import { IAppDispatch } from 'data/store'

const mapStateToProps = ({
  campaigns: { campaigns, loading },
  user: { address, dashboardKey, provider },
  campaign: { decimals },
}: RootState) => ({
  campaigns,
  address,
  decimals,
  loading,
  dashboardKey,
  provider
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    getCampaignBatches: (campaign_id: string | number) => {
      dispatch(
        getCampaignBatches({ campaign_id })
      )
    },
    downloadLinks: (batch_id: string | number, campaign_id: string, title: string) => {
      dispatch(
        downloadLinks(batch_id, campaign_id, title)
      )
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>
type TCampaignStatus = 'paused' | 'pending' | 'active' | 'initial'

const CampaignDetails: FC<ReduxType & IProps & RouteComponentProps> = (props) => {
  const {
    campaigns,
    dashboardKey,
    match: { params },
    getCampaignBatches,
    loading,
    downloadLinks,
    provider,
    address
  } = props
  console.log({ dashboardKey })

  const history = useHistory()

  const [ status, setStatus ] = useState<TCampaignStatus>('initial')
  const [ withdrawable, setWithdrawable ] = useState<boolean>(false)

  useEffect(() => {
    getCampaignBatches(params.id)
  }, [])

  useEffect(() => {
    const onInit = async () => {
      const amount = await defineProxyContractFunds(
        proxy_contract_address,
        provider
      )
      console.log({ amount })
      setWithdrawable(amount > 0)
    }
    onInit()
  }, [])

  useEffect(() => {
    const onInit = async () => {
      const status = await defineCampaignStatus(
        proxy_contract_address,
        provider
      )
      setStatus(status)
    }
    onInit()
  }, [])

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
    created_at,
    creator_address,
    token_address,
    proxy_contract_address,
    claim_pattern,
    chain_id,
    links_count
  } = currentCampaign

  const tokenUrl = defineEtherscanUrl(Number(chain_id), `/address/${token_address || ''}`)
  const ownerUrl = defineEtherscanUrl(Number(chain_id), `/address/${creator_address || ''}`)
  const contractUrl = defineEtherscanUrl(Number(chain_id), `/address/${proxy_contract_address || ''}`)
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
                provider
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
                provider
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
    <WidgetComponent>
      <Header>
        <WidgetTitleStyled>{title || `Campaign ${campaign_id}`}</WidgetTitleStyled>
        <WidgetButton
          appearance='additional'
          size='small'
          title='+ Add batch'
          onClick={() => {
            history.push(`/campaigns/edit/${token_standard}/${campaign_id}/new`)
          }}
        />
      </Header>
      <BatchList>
        <BatchListLabel>Batch</BatchListLabel>
        <BatchListLabel>Links</BatchListLabel>
        <BatchListLabel>Created at</BatchListLabel>
        <BatchListLabel></BatchListLabel>
        {batches && batches.map((batch, idx) => {
          const dateFormatted = formatDate(batch.created_at || '')
          const timeFormatted = formatTime(batch.created_at || '')
          return <>
            <BatchListValue>
              #{idx + 1}
            </BatchListValue>
            <BatchListValue>
              {batch.claim_links_count}
            </BatchListValue>
            <BatchListValue>
              {dateFormatted} <SecondaryTextSpan>{timeFormatted}</SecondaryTextSpan>
            </BatchListValue>
            <WidgetButton
              appearance='additional'
              size='small'
              title='Download'
              onClick={() => {
                downloadLinks(batch.batch_id, campaign_id, title)
              }}
            />
          </>
        })}
      </BatchList>
    </WidgetComponent>
    <Aside
      title="Campaign"
      options={defineOptions()}
      loading={status === 'pending' || status === 'initial'}
    >
      <AsideRow>
        <AsideText>Created by</AsideText>
        <AsideValue><TextLink href={ownerUrl} target='_blank'>{shortenString(creator_address)}</TextLink></AsideValue>
      </AsideRow>
      {status !== null && <AsideRow>
        <AsideText>Status</AsideText>
        <AsideValue>{defineStatusTitle()}</AsideValue>
      </AsideRow>}

      <AsideDivider />

      <AsideRow>
        <AsideText>Token address</AsideText>
        <AsideValue><TextLink href={tokenUrl} target='_blank'>{shortenString(token_address)}</TextLink></AsideValue>
      </AsideRow>
      <AsideRow>
        <AsideText>Campaign contract</AsideText>
        <AsideValue><TextLink href={contractUrl} target='_blank'>{shortenString(proxy_contract_address)}</TextLink></AsideValue>
      </AsideRow>

      <AsideDivider />

      <AsideRow>
        <AsideText>Claim pattern</AsideText>
        <AsideValue>{claim_pattern}</AsideValue>
      </AsideRow>

      <AsideDivider />

      <AsideRow>
        <AsideText>Network</AsideText>
        <AsideValue>{defineNetworkName(Number(chain_id))}</AsideValue>
      </AsideRow>
      <AsideRow>
        <AsideText>Token standard</AsideText>
        <AsideValue>{token_standard}</AsideValue>
      </AsideRow>
      <AsideRow>
        <AsideText>Links</AsideText>
        <AsideValue>{links_count}</AsideValue>
      </AsideRow>
    </Aside>
  </Container>
}

export default withRouter(connect(mapStateToProps, mapDispatcherToProps)(CampaignDetails))
