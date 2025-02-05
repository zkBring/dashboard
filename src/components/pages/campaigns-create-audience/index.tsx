import { FC, useEffect, useRef, useState } from 'react'
import {
  StyledRadio,
  InstructionNoteStyled,
  InputStyled,
  AudienceStyled,
  ButtonStyled
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TAssetsData, TLinkContent, TLinkParams, TTokenType, TTotalAmount } from 'types'
import { TDefineComponent, TLinksContent } from './types'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import * as userAsyncActions from 'data/store/reducers/user/async-actions/index'
import Icons from 'icons'
import { useQuery } from 'hooks'
import { TextLink } from 'components/common'
import AudienceInstagramLogo from 'images/audience-inst.png'
import {
  WidgetComponent,
  Container,
  Aside,
  WidgetSubtitle,
  WidgetContainer,
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
  alertError,
  countAssetsTotalAmountERC20,
  preventPageClose
} from 'helpers'
import { plausibleApi } from 'data/api'
const {
  REACT_APP_STARTER_PLAN_LINKS_LIMIT,
  REACT_APP_PRO_PLAN_LINKS_LIMIT
} = process.env
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
  const { type, id } = useParams<TLinkParams>()
  const queryParams = useQuery()
  const currentCampaign = id ? campaigns.find(campaign => campaign.campaign_id === id) : null
  const currentTokenAddress = currentCampaign ? currentCampaign.token_address : tokenAddress
  const currentCampaignChainId = currentCampaign ? currentCampaign.chain_id : chainId
  const currentCampaignTokenStandard = currentCampaign ? currentCampaign.token_standard : tokenStandard
  const currentCampaignTitle = currentCampaign ? currentCampaign.title : title
  const currentCampaignSymbol = currentCampaign ? currentCampaign.symbol : symbol
  const currentCampaignSdk = currentCampaign ? currentCampaign.sdk : initialSdk
  const currentCampaignSponsored = currentCampaign ? currentCampaign.sponsored : defineDefaultSponsoredValue(chainId as number)

  const defineRedirectUrl = () => {
    return currentCampaign ? `/campaigns/edit/${tokenStandard}/${currentCampaign.campaign_id}/launch` : `/campaigns/new/${tokenStandard}/launch`
  }

  const [ sdk, setSdk ] = useState<boolean>(currentCampaignSdk)

  const [ data, setData ] = useState<TLinksContent>([])

  const [
    formData,
    setFormData
  ] = useState<TLinkContent>(
    getDefaultValues(type)
  )

  const [ uploadCSVPopup, setUploadCSVPopup ] = useState<boolean>(false)
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
    <Aside
      // back={{
      //   action: () => {
      //     history.goBack()
      //   }
      // }}
      // next={{
      //   title: defineNextButtonTitle(),
      //   action: () => {
      //     let assetsCurrent = assetsParsed
      //     let dataCurrent = data
      //     if ((!data.length || !assetsParsed) && !sdk) {
      //       if (tokenStandard === 'ERC20') {
      //         if (!formData.linksAmount && !formData.tokenAmount) {
      //           return alert('No assets added for distribution')
      //         }
      //       }
      //       if (tokenStandard === 'ERC721') {
      //         if (!formData.tokenId) {
      //           return alert('No assets added for distribution')
      //         }
      //       }
      //       if (tokenStandard === 'ERC1155') {
      //         if (!formData.tokenId) {
      //           return alert('No assets added for distribution')
      //         }
      //       }
      //       const dataCurrent = [ ...data, {
      //         ...formData,
      //         id: data.length
      //       }]
      //       assetsCurrent = convertLinksContent(dataCurrent, decimals as number, claimPattern, sdk)
      //       setData(dataCurrent)
      //       setAssetsParsedValue(assetsCurrent)
      //       setFormData(getDefaultValues(tokenStandard as TTokenType))
      //       // return alert('Your assets data was submitted. Please continue')
      //     }
      //     const callback = () => {
      //       history.push(defineRedirectUrl())
      //     }
      //     if (whitelisted && REACT_APP_PRO_PLAN_LINKS_LIMIT && assetsParsed.length > Number(REACT_APP_PRO_PLAN_LINKS_LIMIT as string)) {
      //       return alertError(`Pro plan is limited to ${REACT_APP_PRO_PLAN_LINKS_LIMIT} links per batch. Contact us if you need to increase limits.`)
      //     }
      //     if (!whitelisted && REACT_APP_STARTER_PLAN_LINKS_LIMIT && assetsParsed.length > Number(REACT_APP_STARTER_PLAN_LINKS_LIMIT as string)) {
      //       return alertError(`Starter plan is limited to ${REACT_APP_STARTER_PLAN_LINKS_LIMIT} links per batch. Upgrade your plan to increase limits.`)
      //     }
      //     if (claimPattern === 'mint') {
      //       return grantRole(
      //         assetsCurrent,
      //         dataCurrent,
      //         sdk,
      //         sponsored,
      //         !Boolean(id),
      //         callback
      //       )
      //     }
      //     if (tokenStandard === 'ERC20') {
      //       if (sdk) {
      //         return approveAllERC20(
      //           assetsCurrent,
      //           dataCurrent,
      //           sdk,
      //           sponsored,
      //           !Boolean(id),
      //           callback
      //         )
      //       }
      //       const totalAmount = tokenStandard !== 'ERC20' ? undefined : countAssetsTotalAmountERC20(assetsCurrent, decimals)
      //       approveERC20(
      //         assetsCurrent,
      //         totalAmount as TTotalAmount,
      //         dataCurrent,
      //         sdk,
      //         sponsored,
      //         !Boolean(id),
      //         callback
      //       )
      //     } else if (tokenStandard === 'ERC721') {
      //       approveERC721(
      //         assetsCurrent,
      //         dataCurrent,
      //         sdk,
      //         sponsored,
      //         !Boolean(id),
      //         callback
      //       )
      //     } else {
      //       approveERC1155(
      //         assetsCurrent,
      //         dataCurrent,
      //         sdk,
      //         sponsored,
      //         !Boolean(id),
      //         callback
      //       )
      //     }
      //   },
      //   loading,
      //   disabled: defineIfNextDisabled()
      // }}
      // title="Summary"
      // subtitle="Check and confirm details"
    >
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
      <AudienceStyled
        options={[{
          title: 'Instagram',
          image: AudienceInstagramLogo
        }]}
      />
      <InputStyled
        value={instagramID}
        placeholder='e.g. 123456'
        onChange={(value: string) => {
          setInstagramID(value)
          return value
        }}
        title='Set Instagram ID to follow'
      />

      <ButtonsContainer>
        <ButtonStyled
          appearance='action'
          onClick={() => {
            setReclaimInstagramId(
              instagramID,
              () => {}
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
