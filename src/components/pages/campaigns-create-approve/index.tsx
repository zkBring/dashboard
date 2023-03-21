import { FC, useEffect, useState } from 'react'
import {
  StyledRadio,
  InstructionNoteStyled,
} from './styled-components'
import { Erc20, Erc721, Erc1155, CSVUploadPopup, SDKLinks, AsideContents } from './components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TTokenType, TAssetsData, TLinkContent, TLinkParams, TClaimPattern } from 'types'
import { TDefineComponent, TLinksContent } from './types'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import * as userAsyncActions from 'data/store/reducers/user/async-actions/index'
import Icons from 'icons'
import { TextLink } from 'components/common'
import { bignumber, multiply } from 'mathjs'
import {
  WidgetComponent,
  Container,
  Aside,
  WidgetSubtitle,
  WidgetContainer,
} from 'components/pages/common'
import { useHistory } from 'react-router-dom'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import { Dispatch } from 'redux'
import { CampaignActions } from 'data/store/reducers/campaign/types'
import {
  convertLinksContent,
  defineNativeTokenSymbol,
  countNativeTokensToSecure
} from 'helpers'
import { TAsideContentsProps } from './components/aside-contents/types'

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
  },
  campaigns: {
    campaigns
  },
  user: {
    chainId,
    comission
  }
}: RootState) => ({
  tokenStandard,
  loading,
  campaigns,
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
  comission
})

const mapDispatcherToProps = (dispatch: IAppDispatch  & Dispatch<CampaignActions>) => {
  return {
    checkIfApproved: () => {
      dispatch(
        userAsyncActions.checkIfApproved()
      )
    },
    setApproved: (approved: boolean) => {
      dispatch(
        campaignActions.setApproved(approved)
      )
    },
    checkIfGranted: () => {
      dispatch(
        userAsyncActions.checkIfGranted()
      )
    },
    approveERC20: (
      assets: TAssetsData,
      assetsOriginal: TLinkContent[],
      sdk: boolean,
      sponsored: boolean,
      callback: () => void
    ) => {
      dispatch(
        userAsyncActions.approveERC20(
          assets,
          assetsOriginal,
          sdk,
          sponsored,
          callback
        )
        )
    },
    approveAllERC20: (
      assets: TAssetsData,
      assetsOriginal: TLinkContent[],
      sdk: boolean,
      sponsored: boolean,
      callback: () => void
    ) => {
      dispatch(
        userAsyncActions.approveAllERC20(
          assets,
          assetsOriginal,
          sdk,
          sponsored,
          callback
        )
        )
    },
    approveERC721: (
      assets: TAssetsData,
      assetsOriginal: TLinkContent[],
      sdk: boolean,
      sponsored: boolean,
      callback: () => void
    ) => {
      dispatch(
        userAsyncActions.approveERC721(
          assets,
          assetsOriginal,
          sdk,
          sponsored,
          callback
        )
      )
    },
    approveERC1155: (
      assets: TAssetsData,
      assetsOriginal: TLinkContent[],
      sdk: boolean,
      sponsored: boolean,
      callback: () => void
    ) => {
      dispatch(
        userAsyncActions.approveERC1155(
          assets,
          assetsOriginal,
          sdk,
          sponsored,
          callback
        )
      )
    },
    grantRole: (
      assets: TAssetsData,
      assetsOriginal: TLinkContent[],
      sdk: boolean,
      sponsored: boolean,
      callback: () => void
    ) => {
      dispatch(
        userAsyncActions.grantRole(
          assets,
          assetsOriginal,
          sdk,
          sponsored,
          callback
        )
      )
    },
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
      assetsOriginal: TLinkContent[],
      callback: () => void
    ) => dispatch(campaignAsyncActions.setAssetsData(
        assets,
        assetsOriginal,
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


const defineComponent: TDefineComponent = (
  type,
  assetsData,
  setAssetsData,
  claimPattern,
  setUploadCSVPopup,
  sponsored,
  sdk,
  campaign,
) => {

  if (!sponsored && sdk) {
    return null
  }

  if (sdk) {
    return <SDKLinks
      type={type}
      sdk={sdk}
      campaign={campaign}
      assetsData={assetsData}
      setAssetsData={setAssetsData}
    />
  }

  const UploadInstructionNote = type === 'ERC721' &&  claimPattern === 'mint' ? null : <InstructionNoteStyled
    icon={<Icons.UploadFileIcon />}
  >
    If you have a big set of different tokens to distribute, you could also provide this information by <TextLink onClick={setUploadCSVPopup}>uploading a CSV file. </TextLink>
  </InstructionNoteStyled>

  switch(type.toUpperCase()) {
    case 'ERC20':
      return <Erc20
        sdk={sdk}
        type={type}
        campaign={campaign}
        assetsData={assetsData}
        setAssetsData={setAssetsData}
    >
      {UploadInstructionNote}
    </Erc20>
    case 'ERC721':
      return <Erc721
        sdk={sdk}
        type={type}
        campaign={campaign}
        assetsData={assetsData}
        setAssetsData={setAssetsData}
      >
        {UploadInstructionNote}
      </Erc721>
    default:
      return <Erc1155
        type={type}
        sdk={sdk}
        campaign={campaign}
        assetsData={assetsData}
        setAssetsData={setAssetsData}
      >
        {UploadInstructionNote}
      </Erc1155>
  }
}

const renderAsideContents = ({
  approved,
  sdk,
  campaignTitle,
  tokenAddress,
  campaignSymbol,
  campaignTokenStandard,
  campaignChainId,
  assetsParsed,
  claimPattern,
  data,
  sponsored,
  totalComission
}: TAsideContentsProps) => {
  return <AsideContents
    approved={approved}
    sdk={sdk}
    campaignTitle={campaignTitle}
    tokenAddress={tokenAddress}
    campaignSymbol={campaignSymbol}
    campaignTokenStandard={campaignTokenStandard}
    campaignChainId={campaignChainId}
    assetsParsed={assetsParsed}
    claimPattern={claimPattern}
    data={data}
    sponsored={sponsored}
    totalComission={totalComission}
  />
}

const CampaignsCreateApprove: FC<ReduxType> = ({
  campaigns,
  sdk: initialSdk,
  tokenAddress,
  decimals,
  chainId,
  tokenStandard,
  title,
  loading,
  grantRole,
  approveERC20,
  approveERC721,
  approveERC1155,
  claimPattern,
  checkIfApproved,
  checkIfGranted,
  symbol,
  approved,
  setApproved,
  approveAllERC20,
  comission: comissionPrice
}) => {

  const [
    assetsParsed,
    setAssetsParsedValue
  ] = useState<TAssetsData>([])

  const history = useHistory()
  const { type, id } = useParams<TLinkParams>()
  const currentCampaign = id ? campaigns.find(campaign => campaign.campaign_id === id) : null

  const currentTokenAddress = currentCampaign ? currentCampaign.token_address : tokenAddress
  const currentCampaignChainId = currentCampaign ? currentCampaign.chain_id : chainId
  const currentCampaignTokenStandard = currentCampaign ? currentCampaign.token_standard : tokenStandard
  const currentCampaignTitle = currentCampaign ? currentCampaign.title : title
  const currentCampaignSymbol = currentCampaign ? currentCampaign.symbol : symbol
  const currentCampaignSdk = currentCampaign ? currentCampaign.sdk : initialSdk

  const defineRedirectUrl = () => {
    return currentCampaign ? `/campaigns/edit/${tokenStandard}/${currentCampaign.campaign_id}/secure` : `/campaigns/new/${tokenStandard}/secure`
  }

  const [ sdk, setSdk ] = useState<boolean>(currentCampaignSdk)
  const [ data, setData ] = useState<TLinksContent>([])
  const [ uploadCSVPopup, setUploadCSVPopup ] = useState<boolean>(false)
  const [ sponsored, setSponsored ] = useState<boolean>(true)
  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })
  const comission = bignumber(String(comissionPrice))
  const content = defineComponent(
    type,
    data,
    setData,
    claimPattern,
    () => setUploadCSVPopup(true),
    sponsored,
    sdk,
    currentCampaign
  )

  const defineIfNextDisabled = () => {
    return ((!data.length || !assetsParsed) && !sdk) || loading
  }

  useEffect(() => {
    if (!currentCampaign) {
      return setApproved(false)
    }
    if (currentCampaign.claim_pattern === 'mint') {
      return checkIfGranted()
    }
    if (tokenStandard === 'ERC20') {
      return setApproved(false)
    }
    checkIfApproved()
  }, [])

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
    let assets = convertLinksContent(data, decimals, claimPattern, sdk)
    if (!assets) { return setAssetsParsedValue([]) }
    setAssetsParsedValue(assets)
  }, [data])

  const potentialComission = multiply(
    comission,
    assetsParsed.length
  )

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
    {uploadCSVPopup && <CSVUploadPopup
      onClose={() => setUploadCSVPopup(false)}
      onUpload={(assets: TLinksContent) => {
        setData(data => [...data, ...assets])
        setUploadCSVPopup(false)
      }}
      tokenStandard={tokenStandard}
      claimPattern={claimPattern}
    />}
    <WidgetContainer>
      <WidgetComponent title='Distribution'>
        <WidgetSubtitle>Select the way you’d prefer to create and distribute tokens</WidgetSubtitle>
        <StyledRadio
          disabled={Boolean(currentCampaign) || loading}
          radios={[
            { label: 'Manual (Select tokens to generate links)', value: false },
            { label: 'SDK (Set up and use our SDK to generate links on the fly)', value: true }
          ]}
          value={sdk}
          onChange={value => {
            setData([])
            setSdk(value)
          }}
        />
      </WidgetComponent>
      <WidgetComponent title='Gasless Claiming'>
        <WidgetSubtitle>Selecting to sponsor transactions will allow users to claim tokens without having any {nativeTokenSymbol} in their wallets, otherwise users will pay gas to cover transactions themselves</WidgetSubtitle>
        <StyledRadio
          disabled={Boolean(currentCampaign) || loading}
          radios={isSponsored}
          value={sponsored}
          onChange={value => {
            setData([])
            setSponsored(value)
          }}
        />
      </WidgetComponent>
      
      {content}
    </WidgetContainer>

    <Aside
      back={{
        action: () => {
          history.goBack()
        }
      }}
      next={{
        title: defineNextButtonTitle(),
        action: () => {
          const callback = () => {
            history.push(defineRedirectUrl())
          }
          if (claimPattern === 'mint') {
            return grantRole(
              assetsParsed,
              data,
              sdk,
              sponsored,
              callback
            )
          }
          if (tokenStandard === 'ERC20') {
            if (sdk) {
              return approveAllERC20(
                assetsParsed,
                data,
                sdk,
                sponsored,
                callback
              )
            }
            approveERC20(
              assetsParsed,
              data,
              sdk,
              sponsored,
              callback
            )
          } else if (tokenStandard === 'ERC721') {
            approveERC721(
              assetsParsed,
              data,
              sdk,
              sponsored,
              callback
            )
          } else {
            approveERC1155(
              assetsParsed,
              data,
              sdk,
              sponsored,
              callback
            )
          }
        },
        loading,
        disabled: defineIfNextDisabled()
      }}
      title="Summary"
      subtitle="Check and confirm details"
    >
      {renderAsideContents({
        approved,
        sdk,
        campaignTitle: currentCampaignTitle,
        tokenAddress: currentTokenAddress,
        campaignSymbol: currentCampaignSymbol,
        campaignTokenStandard: currentCampaignTokenStandard,
        campaignChainId: currentCampaignChainId,
        assetsParsed,
        claimPattern,
        data,
        sponsored,
        totalComission
      })}
    </Aside>
    
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateApprove)
