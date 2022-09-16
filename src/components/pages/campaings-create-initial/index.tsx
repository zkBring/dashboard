import React, { FC, useEffect, useState } from 'react'
import { StyledRadio } from './styled-components'
import { Erc20, Erc721, Erc1155 } from './components'
import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TCampaign, TTokenType, TLinkParams, TDistributionPattern } from 'types'
import { Loader } from 'components/common'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import {
  WidgetComponent,
  Container,
  Aside,
  WidgetSubtitle,
  WidgetContainer
} from 'components/pages/common'
import { useHistory } from 'react-router-dom'

const mapStateToProps = ({
  campaign: {
    tokenStandard,
    loading,
    claimPattern,
    distributionPattern
  },
  campaigns: {
    campaigns
  }
}: RootState) => ({
  tokenStandard,
  loading,
  campaigns,
  claimPattern,
  distributionPattern
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
  campaigns,
  claimPattern,
  distributionPattern
}) => {

  const history = useHistory()
  const { type, id } = useParams<TLinkParams>()
  const currentCampaign = id ? campaigns.find(campaign => campaign.campaign_id === id) : null
  const content = defineComponent(type, currentCampaign)
  const [ radio, setRadio ] = useState<TDistributionPattern>(currentCampaign ? currentCampaign.distribution_pattern : distributionPattern)

  const defineIfNextDisabled = () => {
    return false
  }

  useEffect(() => {
    createProxyContract(currentCampaign?.campaign_number)
  }, [])
  
  return <Container>
    <WidgetContainer>
      <WidgetComponent title='Distribution'>
        {loading && <Loader withOverlay />}
        <WidgetSubtitle>Select the way you’d prefer to create and distribute tokens</WidgetSubtitle>
        <StyledRadio
          disabled={Boolean(currentCampaign)}
          radios={[
            { label: 'Manual (Select token IDs to generate links)', value: 'manual' },
            { label: 'SDK (Set up and use our SDK to generate links on the fly)', value: 'sdk' }
          ]}
          value={radio}
          onChange={value => setRadio(value)}
        />
        {false && content}
      </WidgetComponent>

      <WidgetComponent title='Select tokens'>
        {content}
      </WidgetComponent>
    </WidgetContainer>

    <Aside
      back={{
        action: () => {}
      }}
      next={{
        action: () => {
          history.push(`/campaigns/new/${type}/initial`)
        },
        disabled: defineIfNextDisabled()
      }}
      title="Title"
      subtitle="Subtitle"
    >
    </Aside>
    
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateInitial)
