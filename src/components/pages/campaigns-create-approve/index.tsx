import { FC, useEffect, useState } from 'react'
import {
  StyledRadio,
  InstructionNoteStyled,
  AsideNote,
  ApprovedIcon,
  LoaderStyled
} from './styled-components'
import { Erc20, Erc721, Erc1155, CSVUploadPopup } from './components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TTokenType, TAssetsData, TLinkContent, TLinkParams } from 'types'
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
  TableRow,
  TableText,
  TableValue,
  AsideContent,
  TableValueShorten,
  AssetsList
} from 'components/pages/common'
import { useHistory } from 'react-router-dom'
import * as campaignActions from 'data/store/reducers/campaign/actions'
import { Dispatch } from 'redux'
import { CampaignActions } from 'data/store/reducers/campaign/types'
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
    chainId
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
  assets
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
      callback: () => void
    ) => {
      dispatch(
        userAsyncActions.approveERC20(
          assets,
          assetsOriginal,
          sdk,
          callback
        )
        )
    },
    approveERC721: (
      assets: TAssetsData,
      assetsOriginal: TLinkContent[],
      sdk: boolean,
      callback: () => void
    ) => {
      dispatch(
        userAsyncActions.approveERC721(
          assets,
          assetsOriginal,
          sdk,
          callback
        )
      )
    },
    approveERC1155: (
      assets: TAssetsData,
      assetsOriginal: TLinkContent[],
      sdk: boolean,
      callback: () => void
    ) => {
      dispatch(
        userAsyncActions.approveERC1155(
          assets,
          assetsOriginal,
          sdk,
          callback
        )
      )
    },
    grantRole: (
      assets: TAssetsData,
      assetsOriginal: TLinkContent[],
      sdk: boolean,
      callback: () => void
    ) => {
      dispatch(
        userAsyncActions.grantRole(
          assets,
          assetsOriginal,
          sdk,
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
  sdk,
  campaign
) => {

  if (sdk) { return null }

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
  setApproved
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

  const scannerUrl = defineEtherscanUrl(currentCampaignChainId, `/address/${currentTokenAddress || ''}`)

  const [ sdk, setSdk ] = useState<boolean>(currentCampaignSdk)
  const [ data, setData ] = useState<TLinksContent>([])
  const [ uploadCSVPopup, setUploadCSVPopup ] = useState<boolean>(false)
  const content = defineComponent(
    type,
    data,
    setData,
    claimPattern,
    () => setUploadCSVPopup(true),
    sdk,
    currentCampaign
  )

  const defineIfNextDisabled = () => {
    if (type === 'ERC20') { return true }
    return (!data.length || !assetsParsed) && !sdk && !loading
  }

  useEffect(() => {
    if (!currentCampaign) {
      return setApproved(false)
    }
    if (currentCampaign.claim_pattern === 'mint') {
      return checkIfGranted()
    }
    if (tokenStandard === 'ERC20') { return setApproved(false) }
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
    console.log({ data })
    let assets = convertLinksContent(data, decimals, claimPattern)
    if (!assets) { return setAssetsParsedValue([]) }
    setAssetsParsedValue(assets)
  }, [data])

  const approvedNote = () => {
    if (approved === null) {
      return <AsideNote>
        <LoaderStyled />
        Сhecking approval...
      </AsideNote>
    }

    if (approved) {
      return <AsideNote>
        <ApprovedIcon />
        Token has been approved before
      </AsideNote>
    }
    return null
  }
  
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
          disabled={Boolean(currentCampaign) || type === 'ERC20'}
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
              callback
            )
          }
          if (tokenStandard === 'ERC20') {
            approveERC20(
              assetsParsed,
              data,
              sdk,
              callback
            )
          } else if (tokenStandard === 'ERC721') {
            approveERC721(
              assetsParsed,
              data,
              sdk,
              callback
            )
          } else {
            approveERC1155(
              assetsParsed,
              data,
              sdk,
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
        <TableRow>
          <TableText>Title of campaign</TableText>
          <TableValueShorten>{currentCampaignTitle}</TableValueShorten>
        </TableRow>

        {currentTokenAddress && <TableRow>
          <TableText>Token address</TableText>
          <TableValue><TextLink href={scannerUrl} target='_blank'>{shortenString(currentTokenAddress)}</TextLink></TableValue>
        </TableRow>}

        {currentCampaignSymbol && <TableRow>
          <TableText>Token Name</TableText>
          <TableValue>{currentCampaignSymbol}</TableValue>
        </TableRow>}

        {currentCampaignTokenStandard && <TableRow>
          <TableText>Token standard</TableText>
          <TableValue>{currentCampaignTokenStandard}</TableValue>
        </TableRow>}

        {currentCampaignChainId && <TableRow>
          <TableText>Network</TableText>
          <TableValue>{defineNetworkName(Number(currentCampaignChainId))}</TableValue>
        </TableRow>}

        {currentCampaignTokenStandard && <AssetsList
          claimPattern={claimPattern}
          data={data}
          type={currentCampaignTokenStandard}
        />}

        <TableRow>
          <TableText>Total links</TableText>
          <TableValue>{assetsParsed.length}</TableValue>
        </TableRow>

        <TableRow>
          <TableText>Claim pattern</TableText>
          <TableValue>{claimPattern}</TableValue>
        </TableRow>
      </AsideContent>
      {approvedNote()}
    </Aside>
    
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateApprove)
