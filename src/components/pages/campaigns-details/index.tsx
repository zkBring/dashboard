import { FC } from 'react'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom'
import {
  WidgetComponent,
  Container,
  WidgetButton,
  BatchList,
  BatchTitle
} from './styled-components'
import { downloadLinksAsCSV } from 'helpers'
import { useHistory } from 'react-router-dom'
import {
  formatDate
} from 'helpers'
import { IProps } from './types'

const mapStateToProps = ({
  campaigns: { campaigns },
  user: { address },
  campaign: { decimals },
}: RootState) => ({
  campaigns,
  address,
  decimals,
})

type ReduxType = ReturnType<typeof mapStateToProps>

const CampaignDetails: FC<ReduxType & IProps & RouteComponentProps> = (props) => {
  const { campaigns, match: { params } } = props
  const history = useHistory()

  const currentCampaign = campaigns.find(campaign => campaign.id === params.id)
  console.log({ currentCampaign })
  if (!currentCampaign) {
    return null
  }
  const { id, type, title, batches } = currentCampaign
  
  return <Container>
    <WidgetComponent title={title || `Campaign ${id}`}>
      <BatchList>
        {batches.map(batch => {
          return null
          const dateFormatted = formatDate(batch.date)
          return <>
            <BatchTitle>
            {batch.batch_description} / {batch.claim_links.length} link(s). Created {dateFormatted} {batch.sponsored ? '(sponsored)' : ''}
            </BatchTitle>
            <WidgetButton
              appearance='action'
              title='Download CSV'
              onClick={() => {
                downloadLinksAsCSV(batch.claim_links, id)
              }}
            />
          </>
        })}
      </BatchList>
      <WidgetButton
        appearance='action'
        title='+ Add more links'
        onClick={() => {
          history.push(`/campaigns/edit/${type}/${id}/initial`)
        }}
      />
    </WidgetComponent>
  </Container>
}

export default withRouter(connect(mapStateToProps)(CampaignDetails))
