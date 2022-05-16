import { FC, useState } from 'react'
import { Breadcrumbs, Button } from 'components/common'
// import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { WidgetComponent, Container, WidgetButton } from './styled-components'
import { downloadLinksAsCSV } from 'helpers'
import { useHistory } from 'react-router-dom'
import { defineNetworkName, capitalize, defineEtherscanUrl } from 'helpers'
import { TTokenType } from 'types'
const ipfsGatewayUrl = 'https://gateway.pinata.cloud/ipfs/'

const { REACT_APP_CLAIM_URL } = process.env

type TReduceTokens = {
  [tokenId: string]: number
}

type TMapTokensIds = string[]

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
  const { chainId, id, tokenAddress, type, decimals, links } = currentCampaign
  
  return <Container>
    <WidgetComponent title='Get the Links'>
      <WidgetButton
        appearance='action'
        onClick={() => downloadLinksAsCSV(links, id)}
        title='Download CSV'
      />
    </WidgetComponent>
  </Container>
}

export default withRouter(connect(mapStateToProps)(CampaignDetails))

