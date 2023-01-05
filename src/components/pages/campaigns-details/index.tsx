import { FC, useEffect } from 'react'
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
  decryptLinks,
  downloadLinksAsCSV
} from 'helpers'
import { TextLink } from 'components/common'

import { useHistory } from 'react-router-dom'
import { getCampaignBatches, downloadLinks } from 'data/store/reducers/campaigns/async-actions'
import { IProps } from './types'
import { IAppDispatch } from 'data/store'

const mapStateToProps = ({
  campaigns: { campaigns, loading },
  user: { address, dashboardKey },
  campaign: { decimals },
}: RootState) => ({
  campaigns,
  address,
  decimals,
  loading,
  dashboardKey
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    getCampaignBatches: (campaign_id: string | number) => {
      dispatch(
        getCampaignBatches({ campaign_id })
      )
    },
    downloadLinks: (batch_id: string | number, campaign_id: string | number, title: string) => {
      dispatch(
        downloadLinks(batch_id, campaign_id, title)
      )
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const CampaignDetails: FC<ReduxType & IProps & RouteComponentProps> = (props) => {
  const {
    campaigns,
    dashboardKey,
    match: { params },
    getCampaignBatches,
    loading,
    downloadLinks
  } = props
  const history = useHistory()
  useEffect(() => {
    getCampaignBatches(params.id)
  }, [])

  const currentCampaign = campaigns.find(campaign => campaign.campaign_id === params.id)
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
    chain_id
  } = currentCampaign
  const tokenUrl = defineEtherscanUrl(chain_id, `/address/${token_address || ''}`)
  const ownerUrl = defineEtherscanUrl(chain_id, `/address/${creator_address || ''}`)
  const contractUrl = defineEtherscanUrl(chain_id, `/address/${proxy_contract_address || ''}`)
  const totalLinks = batches ? batches.reduce((sum, item) => {
    return sum + item.claim_links_count
  }, 0) : 0
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
    >
      <AsideRow>
        <AsideText>Created by</AsideText>
        <AsideValue><TextLink href={ownerUrl} target='_blank'>{shortenString(creator_address)}</TextLink></AsideValue>
      </AsideRow>
      <AsideRow>
        <AsideText>Status</AsideText>
        <AsideValue>Active</AsideValue>
      </AsideRow>

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
        <AsideValue>{totalLinks}</AsideValue>
      </AsideRow>
    </Aside>
  </Container>
}

export default withRouter(connect(mapStateToProps, mapDispatcherToProps)(CampaignDetails))
