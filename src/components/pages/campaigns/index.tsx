import { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Campaign } from 'components/common'
import { Container, StyledWidget, Title, WidgetDescription, WidgetButton } from './styled-components'
import { TProps } from './types'
import { TLinksBatch } from 'types'
import { defineNativeTokenSymbol } from 'helpers'

const mapStateToProps = ({
  campaigns: { campaigns },
  user: { address, chainId },
}: RootState) => ({
  campaigns,
  address,
  chainId
})

type ReduxType = ReturnType<typeof mapStateToProps>

const CampaignsPage: FC<ReduxType & TProps> = ({ campaigns, address, connectWallet, chainId }) => {
  const currentAddressCampaigns = campaigns.filter(campaign => {
    return campaign.creator_address.toLocaleLowerCase() === address.toLocaleLowerCase()
  })
  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })

  const createNewCampaignWidget = <StyledWidget title='New campaign'>
      <WidgetDescription>
        Create a campaign to distribute your NFTs via claim links
      </WidgetDescription>
      <WidgetButton 
        title='Create'
        appearance='action'
        to='/campaigns/new'
      />
    </StyledWidget>  

    return <>
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
              symbol={campaign.symbol}
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
