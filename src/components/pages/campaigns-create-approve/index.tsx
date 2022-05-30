import { FC } from 'react'
import {
  Container,
  WidgetComponent,
} from './styled-components'
import { Summary } from './components'
import { RootState } from 'data/store';
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TLinkParams } from 'types'

const mapStateToProps = ({
  campaigns: {
    campaigns
  }
}: RootState) => ({
  campaigns
})

type ReduxType = ReturnType<typeof mapStateToProps>


const CampaignsCreateApprove: FC<ReduxType> = ({
  campaigns
}) => {
  const { id } = useParams<TLinkParams>()
  const currentCampaign = id ? campaigns.find(campaign => campaign.id === id) : null
  return <Container>
    <WidgetComponent title='Approve'>
      <Summary campaign={currentCampaign} />
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps)(CampaignsCreateApprove)
