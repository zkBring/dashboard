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
  InformationContainerStyled
} from './styled-components'
import { TProps } from './types'
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

const CampaignsPage: FC<ReduxType & TProps> = ({ campaigns, address, chainId }) => {
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
      <InformationContainerStyled
        title='Getting started'
        id='initial_guide'
        contents={[
          {
            title: 'Setting up a campaign',
            link: {
              title: 'Read the guide ->',
              href: 'https://linkdrop-2.gitbook.io/linkdrop-knoe/how-tos/main-guide/setting-up-a-campaign'
            }
          }, {
            title: 'Distributing NFTs with QRs, claim codes or links',
            link: {
              title: 'Read the guide ->',
              href: 'https://linkdrop-2.gitbook.io/linkdrop-knoe/how-tos/distribution-qrs-claim-codes-or-links'
            }
          }, {
            title: 'Integrating SDK for custom logic',
            link: {
              title: 'Read the guide ->',
              href: 'https://linkdrop-2.gitbook.io/linkdrop-knoe/sdk'
            }
          }
        ]}
      />
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
