import { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Campaign } from 'components/common'
import { Container, InvertedWidget, Title, WidgetDescription, WidgetButton } from './styled-components'
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

const countLinks: (batches: TLinksBatch[]) => number = (batches) => {
  if (!batches) { return 0 }
  return batches
    .map(batch => batch.claim_links.length)
    .reduce<number>((sum, item) => {
      return sum + item
    }, 0)
}

const mapDispatcherToProps = (dispatch: Dispatch) => {
  return {
  }
}

type ReduxType = ReturnType<typeof mapStateToProps>  & ReturnType<typeof mapDispatcherToProps>

const CampaignsPage: FC<ReduxType & TProps> = ({ campaigns, address, connectWallet, chainId }) => {
  const currentAddressCampaigns = campaigns.filter(campaign => {
    return campaign.creator_address.toLocaleLowerCase() === address.toLocaleLowerCase()
  })
  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })

  const createNewCampaignWidget = <InvertedWidget title='Create Campaign'>
      <WidgetDescription>
        ERC20 / ERC721 / ERC1155 + {nativeTokenSymbol}
      </WidgetDescription>
      <WidgetButton
        title='Create'
        appearance='action'
        to='/campaigns/new'
      />
    </InvertedWidget>  

    return <>
      {createNewCampaignWidget}
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
            linksAmount={countLinks(campaign.batches)}
            proxyContractAddress={campaign.proxy_contract_address}
            claimPattern={campaign.claim_pattern}
          />
        })}
      </Container>
    </>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsPage)
