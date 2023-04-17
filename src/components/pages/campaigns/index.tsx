import { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { Campaign } from 'components/common'
import {
  Container,
  StyledWidget,
  Title,
  WidgetDescription,
  WidgetButton,
} from './styled-components'
import { InitialGuide } from 'components/pages/common'
import { TProps } from './types'

const mapStateToProps = ({
  campaigns: { campaigns },
  user: { address, chainId, loading },
}: RootState) => ({
  campaigns,
  address,
  chainId,
  loading
})

type ReduxType = ReturnType<typeof mapStateToProps>

const CampaignsPage: FC<ReduxType & TProps> = ({ campaigns, address, loading }) => {
  const currentAddressCampaigns = campaigns.filter(campaign => {
    return campaign.creator_address.toLocaleLowerCase() === address.toLocaleLowerCase()
  })

  const createNewCampaignWidget = <StyledWidget title='New campaign'>
      <WidgetDescription>
        Create a campaign to distribute your NFTs via claim links
      </WidgetDescription>
      <WidgetButton 
        title={loading ? 'Loading' : 'Create'}
        appearance='action'
        to='/campaigns/new'
        loading={loading}
      />
    </StyledWidget>  

    return <>
      <InitialGuide />
      {createNewCampaignWidget}
      {currentAddressCampaigns && currentAddressCampaigns.length > 0 && <>
        <Title>Campaigns</Title>
        <Container>
          {currentAddressCampaigns.map(campaign => {
            return <Campaign
              title={campaign.title}
              created_at={campaign.created_at}
              id={campaign.campaign_id}
              key={campaign.campaign_id}
              chainId={campaign.chain_id}
              type={campaign.token_standard}
              linksAmount={campaign.links_count}
              proxyContractAddress={campaign.proxy_contract_address}
              claimPattern={campaign.claim_pattern}
            />
          })}
        </Container>
      </>}
    </>
}

export default connect(mapStateToProps)(CampaignsPage)
