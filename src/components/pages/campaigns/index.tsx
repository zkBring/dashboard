import React, { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Campaign, Note, TextLink } from 'components/common'
import { Container } from './styled-components'
import { TProps } from './types'

const mapStateToProps = ({
  campaigns: { campaigns },
  user: { address, chainId },
}: RootState) => ({
  campaigns,
  address,
  chainId
})

const mapDispatcherToProps = (dispatch: Dispatch) => {
  return {
  }
}

type ReduxType = ReturnType<typeof mapStateToProps>  & ReturnType<typeof mapDispatcherToProps>

const CampaignsPage: FC<ReduxType & TProps> = ({ campaigns, address, connectWallet, chainId }) => {
  const currentAddressCampaigns = campaigns.filter(campaign => {
    return campaign.creator_address.toLocaleLowerCase() === address.toLocaleLowerCase()
  })
  if (currentAddressCampaigns.length === 0) {
    return <Note>
      If you don't see the previously created campaigns, <TextLink target='blank' href='https://dashboard.linkdrop.io/'>switch to the old version</TextLink> of the dashboard and check that the correct wallet and network are selected
    </Note>
  }

  return <Container>
    {currentAddressCampaigns.map(campaign => {
      return <Campaign
        title={campaign.title}
        created_at={campaign.created_at}
        id={campaign.campaign_id}
        key={campaign.campaign_id}
        chainId={campaign.chain_id}
        type={campaign.token_standard}
        symbol={campaign.symbol}
        proxyContractAddress={campaign.proxy_contract_address}
      />
    })}
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsPage)
