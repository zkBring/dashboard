import { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { Campaign, Draft } from 'components/common'
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
  campaigns: { campaigns, drafts },
  user: { address, chainId, loading },
}: RootState) => ({
  campaigns,
  address,
  chainId,
  loading,
  drafts
})

type ReduxType = ReturnType<typeof mapStateToProps>

const CampaignsPage: FC<ReduxType & TProps> = ({ campaigns, address, loading, drafts, chainId }) => {
  const currentAddressCampaigns = campaigns.filter(campaign => {
    return campaign.creator_address.toLocaleLowerCase() === address.toLocaleLowerCase()
  })

  const currentAddressDrafts = drafts.filter(draft => {
    return draft.creatorAddress.toLocaleLowerCase() === address.toLocaleLowerCase() && draft.chainId === chainId
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
      {currentAddressDrafts && currentAddressDrafts.length > 0 && <>
        <Title>Drafts</Title>
        <Container>
          {currentAddressDrafts.map(draft => {
            const { campaign, chainId, createdAt, step } = draft
            return <Draft
              title={campaign.title}
              createdAt={createdAt}
              id={campaign.id}
              key={campaign.id}
              chainId={chainId}
              type={campaign.tokenStandard}
              proxyContractAddress={campaign.proxyContractAddress}
              claimPattern={campaign.claimPattern}
              sponsored={campaign.sponsored || false}
              stepToOpen={step}
              tokenAddress={campaign.tokenAddress}
            />
          })}
        </Container>
      </>}
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
              sponsored={campaign.sponsored || false}
              linksClaimed={campaign.links_claimed || 0}
            />
          })}
        </Container>
      </>}
    </>
}

export default connect(mapStateToProps)(CampaignsPage)
