import React, { FC, useEffect, useState } from 'react'
import { StyledRadio } from './styled-components'
import { Erc20, Erc721, Erc1155 } from './components'
import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TTokenType, TAssetsData, TSelectOption, TClaimPattern, TLinkParams, TDistributionPattern } from 'types'
import { Loader } from 'components/common'
import { TDefineComponent, TLinksContent } from './types'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import {
  WidgetComponent,
  Container,
  Aside,
  WidgetSubtitle,
  WidgetContainer
} from 'components/pages/common'
import { useHistory } from 'react-router-dom'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import { Dispatch } from 'redux'
import { CampaignActions } from 'data/store/reducers/campaign/types'
import {
  NATIVE_TOKEN_ADDRESS
} from 'configs/app'
import { convertLinksContent } from 'helpers'

const mapStateToProps = ({
  campaign: {
    tokenStandard,
    loading,
    claimPattern,
    distributionPattern,
    tokenAddress,
    decimals
  },
  campaigns: {
    campaigns
  }
}: RootState) => ({
  tokenStandard,
  loading,
  campaigns,
  claimPattern,
  distributionPattern,
  tokenAddress,
  decimals
})

const mapDispatcherToProps = (dispatch: IAppDispatch  & Dispatch<CampaignActions>) => {
  return {
    createProxyContract: (
      id?: string
    ) => dispatch(
      campaignAsyncActions.createProxyContract(id)
    ),
    setTokenContractData: (
      provider: any,
      tokenAddress: string,
      type: TTokenType,
      address: string,
      chainId: number
    ) => campaignAsyncActions.setTokenContractData(
      dispatch,
      tokenAddress,
      provider,
      type,
      address,
      chainId
    ),
    setAssetsData: (
      assets: TAssetsData,
      callback: () => void
    ) => dispatch(campaignAsyncActions.setAssetsData(
        assets,
        callback
      )
    ),
    clearCampaign: () => {
      dispatch(
        campaignActions.clearCampaign()
      )
    }
  }
}


type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps>


const defineComponent: TDefineComponent = (type, assetsData, setAssetsData, campaign) => {
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
      assetsData={assetsData}
      setAssetsData={setAssetsData}
    />
  }
}

const CampaignsCreateInitial: FC<ReduxType> = ({
  createProxyContract,
  loading,
  campaigns,
  claimPattern,
  distributionPattern,
  setAssetsData,
  tokenAddress,
  decimals
}) => {

  const [
    assetsParsed,
    setAssetsParsedValue
  ] = useState<TAssetsData>([])

  const history = useHistory()
  const { type, id } = useParams<TLinkParams>()
  const currentCampaign = id ? campaigns.find(campaign => campaign.campaign_id === id) : null
  
  const [ distributionType, setDistributionType ] = useState<TDistributionPattern>(currentCampaign ? currentCampaign.distribution_pattern : distributionPattern)
  const [ data, setData ] = useState<TLinksContent>([])
  const content = defineComponent(type, data, setData, currentCampaign)

  const defineIfNextDisabled = () => {
    return (!data.length || !assetsParsed) && distributionType === 'manual'
  }

  useEffect(() => {
    createProxyContract(currentCampaign?.campaign_number)
  }, [])

  useEffect(() => {
    if (!data || !decimals) { return setAssetsParsedValue([]) }
    let assets = convertLinksContent(data, decimals)
    if (!assets) { return setAssetsParsedValue([]) }
    setAssetsParsedValue(assets)
  }, [data])
  
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
          value={distributionType}
          onChange={value => {
            // setData([])
            setDistributionType(value)
          }}
        />
      </WidgetComponent>

      {distributionType !== 'sdk' && <WidgetComponent title='Select tokens'>
        {content}
      </WidgetComponent>}
    </WidgetContainer>

    <Aside
      back={{
        action: () => {}
      }}
      next={{
        action: () => {
          setAssetsData(
            assetsParsed,
            () => {
              if (tokenAddress === NATIVE_TOKEN_ADDRESS) {
                if (currentCampaign) {
                  return history.push(`/campaigns/edit/${type}/${currentCampaign.campaign_id}/secure`)
                }
                return history.push(`/campaigns/new/${type}/secure`)
              }
              if (currentCampaign) {
                return history.push(`/campaigns/edit/${type}/${currentCampaign.campaign_id}/approve`)
              }
              history.push(`/campaigns/new/${type}/approve`)
            }
          )
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
