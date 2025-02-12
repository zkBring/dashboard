import { FC, useEffect, useState } from 'react'
import {
  InputStyled,
  AudienceStyled,
  ButtonStyled,
  Text,
  Subtitle
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TAssetsData, TLinkParams, TTokenType } from 'types'
import { TLinksContent } from './types'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import AudienceInstagramLogo from 'images/audience-inst.png'
import AudienceXLogo from 'images/audience-x.png'
import {
  TextLink
} from 'components/common'
import {
  WidgetComponent,
  Container,
  Aside,
  ButtonsContainer
} from 'components/pages/common'
import { useHistory } from 'react-router-dom'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import { Dispatch } from 'redux'
import { CampaignActions } from 'data/store/reducers/campaign/types'
import {
  convertLinksContent,
  defineNativeTokenSymbol,
  countNativeTokensToSecure,
  preventPageClose
} from 'helpers'
import { plausibleApi } from 'data/api'


import {
  Breadcrumbs
} from 'components/common'

const mapStateToProps = ({
  campaign: {
    tokenStandard,
    loading,
    claimPattern,
    sdk,
    tokenAddress,
    decimals,
    proxyContractAddress,
    title,
    assets,
    symbol,
    approved,
    collectionId
  },
  campaigns: {
    campaigns
  },
  user: {
    chainId,
    comission,
    whitelisted
  }
}: RootState) => ({
  tokenStandard,
  loading,
  campaigns,
  collectionId,
  claimPattern,
  sdk,
  proxyContractAddress,
  approved,
  tokenAddress,
  decimals,
  chainId,
  title,
  symbol,
  assets,
  comission,
  whitelisted
})

const getDefaultValues = (type: TTokenType) => {
  return {
    linksAmount: '',
    tokenId: '',
    tokenAmount: '',
    type: type
  }
}

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<CampaignActions>) => {
  return {
    // checkIfApproved: () => {
    //   dispatch(
    //     userAsyncActions.checkIfApproved()
    //   )
    // },
    // setApproved: (approved: boolean) => {
    //   dispatch(
    //     campaignActions.setApproved(approved)
    //   )
    // },
    // checkIfGranted: () => {
    //   dispatch(
    //     userAsyncActions.checkIfGranted()
    //   )
    // },
    // approveERC20: (
    //   assets: TAssetsData,
    //   totalAmount: TTotalAmount,
    //   assetsOriginal: TLinkContent[],
    //   sdk: boolean,
    //   sponsored: boolean,
    //   isNewCampaign: boolean,
    //   callback: () => void
    // ) => {
    //   dispatch(
    //     userAsyncActions.approveERC20(
    //       assets,
    //       totalAmount,
    //       assetsOriginal,
    //       sdk,
    //       sponsored,
    //       isNewCampaign,
    //       callback
    //     )
    //     )
    // },
    // approveAllERC20: (
    //   assets: TAssetsData,
    //   assetsOriginal: TLinkContent[],
    //   sdk: boolean,
    //   sponsored: boolean,
    //   isNewCampaign: boolean,
    //   callback: () => void
    // ) => {
    //   dispatch(
    //     userAsyncActions.approveAllERC20(
    //       assets,
    //       assetsOriginal,
    //       sdk,
    //       sponsored,
    //       isNewCampaign,
    //       callback
    //     )
    //   )
    // },
    // grantRole: (
    //   assets: TAssetsData,
    //   assetsOriginal: TLinkContent[],
    //   sdk: boolean,
    //   sponsored: boolean,
    //   isNewCampaign: boolean,
    //   callback: () => void
    // ) => {
    //   dispatch(
    //     userAsyncActions.grantRole(
    //       assets,
    //       assetsOriginal,
    //       sdk,
    //       sponsored,
    //       isNewCampaign,
    //       callback
    //     )
    //   )
    // },
    // clearCampaign: () => {
    //   dispatch(
    //     campaignActions.clearCampaign()
    //   )
    // }

    setReclaimInstagramId: (
      reclaimInstagramId: string,
      callback: () => void
    ) => {
      dispatch(campaignAsyncActions.setReclaimAudience(
        'instagram',
        reclaimInstagramId,
        callback
      ))
    }

  }
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const defineDefaultSponsoredValue = (chainId: number) => {
  if (chainId === 1) {
    return false
  }

  return true
} 

const CampaignsCreateAudience: FC<ReduxType> = ({
  campaigns,
  sdk: initialSdk,
  tokenAddress,
  decimals,
  chainId,
  tokenStandard,
  title,
  loading,
  // grantRole,
  // approveERC20,
  claimPattern,
  // checkIfApproved,
  // checkIfGranted,
  symbol,
  approved,
  // setApproved,
  // approveAllERC20,
  comission: comissionPrice,
  whitelisted,
  collectionId,
  setReclaimInstagramId
}) => {
  const [
    assetsParsed,
    setAssetsParsedValue
  ] = useState<TAssetsData>([])

  const history = useHistory()
  const { id } = useParams<TLinkParams>()
  const currentCampaign = id ? campaigns.find(campaign => campaign.campaign_id === id) : null
  const currentCampaignSponsored = currentCampaign ? currentCampaign.sponsored : defineDefaultSponsoredValue(chainId as number)

  const defineRedirectUrl = () => {
    return currentCampaign ? `/campaigns/edit/${tokenStandard}/${currentCampaign.campaign_id}/launch` : `/campaigns/new/${tokenStandard}/launch`
  }

  const [ data, setData ] = useState<TLinksContent>([])


  const [ sponsored, setSponsored ] = useState<boolean>(Boolean(currentCampaignSponsored))
  const [ instagramID, setInstagramID ] = useState<string>('')

  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })

  const defineIfNextDisabled = () => {
    return loading
  }

  // useEffect(() => {
  //   if (!currentCampaign) {
  //     return setApproved(false)
  //   }
  //   if (currentCampaign.claim_pattern === 'mint') {
  //     return checkIfGranted()
  //   }
  //   if (tokenStandard === 'ERC20') {
  //     return setApproved(false)
  //   }
  //   checkIfApproved()
  // }, [])

  useEffect(preventPageClose(), [])

  const defineNextButtonTitle = () => {
    if (loading) {
      return 'Loading'
    }
    if (approved || approved === null) {
      return 'Continue'
    }
    return claimPattern === 'transfer' ? 'Approve' : 'Grant Role'
  }

  useEffect(() => {
    if (!data || decimals === null) { return setAssetsParsedValue([]) }
    let assets = convertLinksContent(data, decimals, claimPattern)
    if (!assets) { return setAssetsParsedValue([]) }
    setAssetsParsedValue(assets)
  }, [data])


  const isSponsored = [
    { value: true, label: `Sponsor claiming gas fees (+ ${comissionPrice} ${nativeTokenSymbol} per link)` },
    { value: false, label: `No sponsoring` }
  ]

  const {
    totalComission
  } = countNativeTokensToSecure(
    '0',
    assetsParsed,
    comissionPrice,
    sponsored
  )
  
  return <Container>
    <Aside>
      <Breadcrumbs
        items={
          [
            {
              title: 'Token',
              status: 'done'
            }, {
              title: 'Audience',
              status: 'current'
            }, {
              title: 'Launch'
            }
          ]
        }
      />
    </Aside>

    <WidgetComponent title='Choose your audience'>
      <Text>
        More data sources coming soon. <TextLink href="#">Suggest one</TextLink>
      </Text>
      <AudienceStyled
        options={[
          {
            title: 'Instagram',
            image: AudienceInstagramLogo
          }, {
            title: 'X (Twitter)',
            image: AudienceXLogo,
            disabled: true
          }]}
      />

      <Subtitle>
        Set Instagram ID to follow
      </Subtitle>
      <Text>
        Enter the numeric Instagram ID (not @username). <TextLink href="#">Find ID here</TextLink><br/>
        Only users who follow this account will be eligible to claim
      </Text>
      <InputStyled
        value={instagramID}
        placeholder='e.g. 123456'
        onChange={(value: string) => {
          setInstagramID(value)
          return value
        }}
      />

      <ButtonsContainer>
        <ButtonStyled
          appearance='action'
          onClick={() => {
            setReclaimInstagramId(
              instagramID,
              () => {
                history.push(defineRedirectUrl())
              }
            )
          }}
          disabled={!instagramID}
        >
          Next
        </ButtonStyled>
      </ButtonsContainer>
    </WidgetComponent>
  </Container>
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateAudience)
