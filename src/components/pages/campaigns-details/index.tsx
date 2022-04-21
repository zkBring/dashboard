import { FC, useState } from 'react'
import { Breadcrumbs, Button } from 'components/common'
// import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Link, LinkContainer, LinkValue, LinkTitle, WidgetDataBlock, InfoBlockStyled, WidgetDataSplit, InfoBlockContainer, Description, WidgetContainer } from './styled-components'
import { copyToClipboard, shortenString } from 'helpers'
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

  const currentCampaign = campaigns.find(campaign => campaign.ipfsHash === params.id)
  if (!currentCampaign) {
    return null
  }
  const { ipfsHash, title, chainId, tokenAddress, type, decimals, dropAddress } = currentCampaign
  const link = `${REACT_APP_CLAIM_URL}/${ipfsHash}`
  
  

  return <div>
    <Breadcrumbs
      path={['My campaigns', currentCampaign.title]}
      description='Manage your campaign and gain insights into your conversion. Share the link to your claim page.'
      returnAction={() => history.push('/')}
    />
    <InfoBlockContainer>

    </InfoBlockContainer>
    <Description>
      <WidgetContainer>
        <WidgetDataBlock title='Drop’s title' text={title} />
        <WidgetDataSplit>
          <WidgetDataBlock title='Network' text={capitalize(defineNetworkName(chainId))} />
          <WidgetDataBlock title='Type of token' text={type.toUpperCase()} />
        </WidgetDataSplit>
        <WidgetDataBlock title='Token address' text={tokenAddress} />
        {dropAddress && <WidgetDataBlock
          title='Drop contract'
          text={dropAddress}
          link={defineEtherscanUrl(chainId, dropAddress)}
        />}
        <WidgetDataBlock title='IPFS hash' text={shortenString(ipfsHash)} link={`${ipfsGatewayUrl}${ipfsHash}`} />
      </WidgetContainer>

      <LinkContainer>
        <LinkTitle>Link to claimpage</LinkTitle>
        <Link>
          <LinkValue>{link}</LinkValue>
          <Button
            title={copied ? 'Copied!' : 'Copy Link'}
            size='small'
            appearance='action'
            onClick={() => {
              copyToClipboard({ value: link })
              setCopied(true)
            }}
          />
        </Link>
      </LinkContainer>
    </Description>
  </div>
}

export default withRouter(connect(mapStateToProps)(CampaignDetails))

