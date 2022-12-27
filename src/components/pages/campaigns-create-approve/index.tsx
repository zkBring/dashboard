import { FC, useEffect, useState } from 'react'
import { StyledRadio, InstructionNoteStyled } from './styled-components'
import { Erc20, Erc721, Erc1155, CSVUploadPopup } from './components'
import { RootState, IAppDispatch } from 'data/store';
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TTokenType, TAssetsData, TLinkContent, TLinkParams, TDistributionPattern } from 'types'
import { TDefineComponent, TLinksContent } from './types'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import * as userAsyncActions from 'data/store/reducers/user/async-actions/index'
import Icons from 'icons'
import { TextLink } from 'components/common'
import {
  WidgetComponent,
  Container,
  Aside,
  WidgetSubtitle,
  WidgetContainer,
  AsideRow,
  AsideText,
  AsideValue,
  AsideContent,
  AsideValueShorten,
  AssetsList
} from 'components/pages/common'
import { useHistory } from 'react-router-dom'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import { Dispatch } from 'redux'
import { CampaignActions } from 'data/store/reducers/campaign/types'
import {
  NATIVE_TOKEN_ADDRESS
} from 'configs/app'
import {
  convertLinksContent,
  shortenString,
  defineNetworkName,
  defineEtherscanUrl
} from 'helpers'

const mapStateToProps = ({
  campaign: {
    tokenStandard,
    loading,
    claimPattern,
    distributionPattern,
    tokenAddress,
    decimals,
    proxyContractAddress,
    title,
    assets,
    symbol
  },
  campaigns: {
    campaigns
  },
  user: {
    chainId
  }
}: RootState) => ({
  tokenStandard,
  loading,
  campaigns,
  claimPattern,
  distributionPattern,
  proxyContractAddress,
  tokenAddress,
  decimals,
  chainId,
  title,
  symbol,
  assets
})

const mapDispatcherToProps = (dispatch: IAppDispatch  & Dispatch<CampaignActions>) => {
  return {
    checkIfApproved: (
    ) => {
      dispatch(
        userAsyncActions.checkIfApproved()
      )
    },
    checkIfGranted: (
    ) => {
      dispatch(
        userAsyncActions.checkIfGranted()
      )
    },
    approveERC20: (
      assets: TAssetsData,
      assetsOriginal: TLinkContent[],
      callback: () => void
    ) => {
      dispatch(
        userAsyncActions.approveERC20(
          assets,
          assetsOriginal,
          callback)
        )
    },
    approveERC721: (
      assets: TAssetsData,
      assetsOriginal: TLinkContent[],
      callback: () => void
    ) => {
      dispatch(
        userAsyncActions.approveERC721(
          assets,
          assetsOriginal,
          callback
        )
      )
    },
    approveERC1155: (
      assets: TAssetsData,
      assetsOriginal: TLinkContent[],
      callback: () => void
    ) => {
      dispatch(
        userAsyncActions.approveERC1155(
          assets,
          assetsOriginal,
          callback
        )
      )
    },
    grantRole: (
      assets: TAssetsData,
      assetsOriginal: TLinkContent[],
      callback: () => void
    ) => {
      dispatch(
        userAsyncActions.grantRole(
          assets,
          assetsOriginal,
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
  campaign
) => {

  const UploadInstructionNote = type === 'ERC721' &&  claimPattern === 'mint' ? null : <InstructionNoteStyled
    icon={<Icons.UploadFileIcon />}
  >
    If you have a big set of different tokens to distribute, you could also provide this information by <TextLink onClick={setUploadCSVPopup}>uploading a CSV file. </TextLink>
  </InstructionNoteStyled>

  switch(type.toUpperCase()) {
    case 'ERC20':
      return <Erc20
        type={type}
        campaign={campaign}
        assetsData={assetsData}
        setAssetsData={setAssetsData}
    >
      {UploadInstructionNote}
    </Erc20>
    case 'ERC721':
      return <Erc721
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
        campaign={campaign}
        assetsData={assetsData}
        setAssetsData={setAssetsData}
      >
        {UploadInstructionNote}
      </Erc1155>
  }
}

const CampaignsCreateApprove: FC<ReduxType> = ({
  createProxyContract,
  campaigns,
  distributionPattern,
  setAssetsData,
  tokenAddress,
  decimals,
  chainId,
  tokenStandard,
  title,
  assets,
  loading,
  grantRole,
  approveERC20,
  approveERC721,
  approveERC1155,
  claimPattern,
  checkIfApproved,
  checkIfGranted,
  symbol
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
  const redirectURL = currentCampaign ? `/campaigns/edit/${tokenStandard}/${currentCampaign.campaign_id}/secure` : `/campaigns/new/${tokenStandard}/secure`


  const scannerUrl = defineEtherscanUrl(currentCampaignChainId, `/address/${currentTokenAddress || ''}`)

  const [ distributionType, setDistributionType ] = useState<TDistributionPattern>('manual')
  const [ data, setData ] = useState<TLinksContent>([])
  const [ uploadCSVPopup, setUploadCSVPopup ] = useState<boolean>(false)
  const content = defineComponent(
    type,
    data,
    setData,
    claimPattern,
    () => setUploadCSVPopup(true),
    currentCampaign
  )

  const defineIfNextDisabled = () => {
    return (!data.length || !assetsParsed) && distributionType === 'manual' && !loading
  }

  useEffect(() => {
    if (!currentCampaign) {
      return
    }
    if (currentCampaign && currentCampaign.claim_pattern === 'mint') {
      return checkIfGranted()
    }
    if (tokenStandard === 'ERC20') { return }
    checkIfApproved()
  }, [])

  useEffect(() => {
    if (!data || decimals === null) { return setAssetsParsedValue([]) }
    console.log({ data })
    let assets = convertLinksContent(data, decimals, claimPattern)
    if (!assets) { return setAssetsParsedValue([]) }
    setAssetsParsedValue(assets)
  }, [data])
  
  return <Container>
    {uploadCSVPopup && <CSVUploadPopup
      onClose={() => setUploadCSVPopup(false)}
      onUpload={(assets: TLinksContent) => {
        setData(assets)
        setUploadCSVPopup(false)
      }}
      tokenStandard={tokenStandard}
      claimPattern={claimPattern}
    />}
    <WidgetContainer>
      <WidgetComponent title='Distribution'>
        <WidgetSubtitle>Select the way you’d prefer to create and distribute tokens</WidgetSubtitle>
        
        <StyledRadio
          // disabled={Boolean(currentCampaign)}
          disabled
          radios={[
            { label: 'Manual (Select tokens to generate links)', value: 'manual' },
            { label: 'SDK (Set up and use our SDK to generate links on the fly)', value: 'sdk' }
          ]}
          value={distributionType}
          onChange={value => {
            return
            // setData([])
            setDistributionType(value)
          }}
        />
      </WidgetComponent>
      {distributionType !== 'sdk' && content}
    </WidgetContainer>

    <Aside
      back={{
        action: () => {
          history.goBack()
        }
      }}
      next={{
        title: claimPattern === 'transfer' ? 'Approve' : 'Grant Role',
        action: () => {
          const callback = () => {
            history.push(redirectURL)
          }
          if (claimPattern === 'mint') {
            return grantRole(
              assetsParsed,
              data,
              callback
            )
          }
          if (tokenStandard === 'ERC20') {
            approveERC20(
              assetsParsed,
              data,
              callback
            )
          } else if (tokenStandard === 'ERC721') {
            approveERC721(
              assetsParsed,
              data,
              callback
            )
          } else {
            approveERC1155(
              assetsParsed,
              data,
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
      <AsideContent>
        <AsideRow>
          <AsideText>Title of campaign</AsideText>
          <AsideValueShorten>{currentCampaignTitle}</AsideValueShorten>
        </AsideRow>

        {currentTokenAddress && <AsideRow>
          <AsideText>Token address</AsideText>
          <AsideValue><TextLink href={scannerUrl} target='_blank'>{shortenString(currentTokenAddress)}</TextLink></AsideValue>
        </AsideRow>}

        {currentCampaignSymbol && <AsideRow>
          <AsideText>Token Name</AsideText>
          <AsideValue>{currentCampaignSymbol}</AsideValue>
        </AsideRow>}

        {currentCampaignTokenStandard && <AsideRow>
          <AsideText>Token standard</AsideText>
          <AsideValue>{currentCampaignTokenStandard}</AsideValue>
        </AsideRow>}

        {currentCampaignChainId && <AsideRow>
          <AsideText>Network</AsideText>
          <AsideValue>{defineNetworkName(Number(currentCampaignChainId))}</AsideValue>
        </AsideRow>}

        {currentCampaignTokenStandard && <AssetsList
          claimPattern={claimPattern}
          data={data}
          type={currentCampaignTokenStandard}
        />}

        <AsideRow>
          <AsideText>Total links</AsideText>
          <AsideValue>{assetsParsed.length}</AsideValue>
        </AsideRow>

        <AsideRow>
          <AsideText>Claim pattern</AsideText>
          <AsideValue>{claimPattern}</AsideValue>
        </AsideRow>
      </AsideContent>
      
    </Aside>
    
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateApprove)
