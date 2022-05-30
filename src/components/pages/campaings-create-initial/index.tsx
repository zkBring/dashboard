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
    type,
    loading
  },
  campaigns: {
    campaigns
  }
}: RootState) => ({
  type,
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
  if (type === 'erc20') {
    return <Erc20
      type={type}
      campaign={campaign}
    />
  } else if (type === 'erc721') {
    return <Erc721
      type={type}
      campaign={campaign}
    />
  } else {
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
  const currentCampaign = id ? campaigns.find(campaign => campaign.id === id) : null
  const content = defineComponent(type, currentCampaign)
  useEffect(() => {
    createProxyContract(id)
  }, [])
  
  return <Container>
    <WidgetComponent title='Setup'>
      {loading && <Loader withOverlay />}
      {content}
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateInitial)
