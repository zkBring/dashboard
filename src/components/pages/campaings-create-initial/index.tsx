import React, { FC, useEffect } from 'react'
import { Container, WidgetComponent } from './styled-components'
import { Erc20, Erc721, Erc1155 } from './components'
import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TCampaign, TTokenType, TLinkParams } from 'types'
import { Loader } from 'components/common'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'

const mapStateToProps = ({
  campaign: {
    tokenStandard,
    loading
  },
  campaigns: {
    campaigns
  }
}: RootState) => ({
  tokenStandard,
  loading,
  campaigns
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    createProxyContract: (
      id?: string
    ) => dispatch(
      campaignAsyncActions.createProxyContract(id)
    )
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps>

type TDefineComponent = (type: TTokenType, campaign?: TCampaign | null) => React.ReactNode

const defineComponent: TDefineComponent = (type, campaign) => {
  switch(type.toUpperCase()) {
    case 'ERC20':
      return <Erc20
      type={type}
      campaign={campaign}
    />
    case 'ERC721':
      return <Erc721
        type={type}
        campaign={campaign}
      />
    default:
      return <Erc1155
      type={type}
      campaign={campaign}
    />
  }
}

const CampaignsCreateInitial: FC<ReduxType> = ({
  createProxyContract,
  loading,
  campaigns
}) => {
  
  const { type, id } = useParams<TLinkParams>()
  const currentCampaign = id ? campaigns.find(campaign => campaign.campaign_id === id) : null
  const content = defineComponent(type, currentCampaign)
  useEffect(() => {
    createProxyContract(currentCampaign?.campaign_number)
  }, [])
  
  return <Container>
    <WidgetComponent title='Setup'>
      {loading && <Loader withOverlay />}
      {content}
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateInitial)
