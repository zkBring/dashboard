import React, { FC } from 'react'
// import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Campaign } from 'components/common'
import { Container } from './styled-components'

type TProps = {
  connectWallet: () => void
}

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
  return <Container>
    {campaigns.map(campaign => {
      return <Campaign
        assets={campaign.assets}
        title={campaign.title}
        date={campaign.date}
        id={campaign.id}
        key={campaign.id}
        chainId={campaign.chainId}
        type={campaign.type}
        symbol={campaign.symbol}
        batches={campaign.links}
        proxyAddress={campaign.proxyContractAddress}
      />
    })}
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsPage)

