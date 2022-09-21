import { FC, useEffect } from 'react'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { Loader } from 'components/common'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import {
  Header,
  WidgetButton,
  BatchList,
  BatchListLabel,
  BatchListValue,
  WidgetTitleStyled
} from './styled-components'

import {
  WidgetComponent,
  Container,
  Aside
} from 'components/pages/common'

import { downloadLinksAsCSV } from 'helpers'
import { useHistory } from 'react-router-dom'
import { getCampaignBatches } from 'data/store/reducers/campaigns/async-actions'
import {
  formatDate,
  decryptLinks
} from 'helpers'
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
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const CampaignDetails: FC<ReduxType & IProps & RouteComponentProps> = (props) => {
  const { campaigns, dashboardKey, match: { params }, getCampaignBatches, loading } = props
  const history = useHistory()
  useEffect(() => {
    getCampaignBatches(params.id)
  }, [])

  const currentCampaign = campaigns.find(campaign => campaign.campaign_id === params.id)
  if (!currentCampaign) {
    return null
  }
  const { campaign_id, token_standard, title, batches, created_at } = currentCampaign
    
  return <Container>
    <WidgetComponent>
      <Header>
        <WidgetTitleStyled>{title || `Campaign ${campaign_id}`}</WidgetTitleStyled>
        <WidgetButton
          appearance='action'
          size='small'
          title='+ Add'
          onClick={() => {
            history.push(`/campaigns/edit/${token_standard}/${campaign_id}/initial`)
          }}
        />
      </Header>
      {loading && <Loader withOverlay />}
      <BatchList>
        <BatchListLabel>Batch</BatchListLabel>
        <BatchListLabel>Links</BatchListLabel>
        <BatchListLabel>Date created</BatchListLabel>
        <BatchListLabel></BatchListLabel>
        {batches && batches.map(batch => {
          const dateFormatted = formatDate(batch.created_at || '')
          return <>
            <BatchListValue>
            {batch.batch_description}
            </BatchListValue>
            <BatchListValue>
              {batch.claim_links.length} link(s)
            </BatchListValue>
            <BatchListValue>
              {dateFormatted}
            </BatchListValue>
            <WidgetButton
              appearance='action'
              size='small'
              title='Download'
              onClick={() => {
                if (!dashboardKey) { return alert ('dashboardKey is not provided') }
                const decryptedLinks = decryptLinks(batch.claim_links, dashboardKey)
                downloadLinksAsCSV(
                  decryptedLinks,
                  title,
                  batch.created_at || ''
                )
              }}
            />
          </>
        })}
      </BatchList>
    </WidgetComponent>
    <Aside
      title="Title"
      subtitle="Subtitle"
    >
    </Aside>
  </Container>
}

export default withRouter(connect(mapStateToProps, mapDispatcherToProps)(CampaignDetails))
