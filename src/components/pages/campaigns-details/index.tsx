import { FC, useState } from 'react'
import { Breadcrumbs, Button } from 'components/common'
// import { connect, ConnectedProps } from 'react-redux'
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

interface MatchParams {
  id: string;
}

interface IProps extends RouteComponentProps<MatchParams> {
  connectWallet: () => void;
}

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
  const [ copied, setCopied ] = useState(false)
  const history = useHistory()

  const currentCampaign = campaigns.find(campaign => campaign.id === params.id)
  if (!currentCampaign) {
    return null
  }
  const { chainId, id, tokenAddress, type, decimals, links, date } = currentCampaign
  
  return <Container>
    <WidgetComponent title='Get the Links'>
      <BatchList>
        {links.map(batch => {
          const dateFormatted = formatDate(batch.date)
          return <>
            <BatchTitle>
              {batch.links.length} link(s) - created {dateFormatted} {batch.sponsored ? '(sponsored)' : ''}
            </BatchTitle>
            <WidgetButton
              appearance='action'
              title='Download CSV'
              onClick={() => {
                downloadLinksAsCSV(batch.links, id)
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

