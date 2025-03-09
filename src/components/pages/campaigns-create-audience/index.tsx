import { FC, useEffect, useState } from 'react'
import {
  InputStyled,
  AudienceStyled,
  ButtonStyled,
  Text,
  SelectStyled
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TAssetsData, TLinkParams, TProofProvider, TTokenType, TZKTLSService } from 'types'
import { TLinksContent } from './types'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import AudienceInstagramLogo from 'images/audience-inst.png'
import AudienceXLogo from 'images/audience-x.png'
import AudienceCustom from 'images/audience-custom.png'
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
import Icons from 'icons'

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

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<CampaignActions>) => {
  return {

    setAudienceData: (
      zkTLSService: TZKTLSService,
      proofProvider: TProofProvider,
      appId: string,
      secret: string,
      providerId: string,
      handleKey: string,
      callback: () => void
    ) => {
      dispatch(campaignAsyncActions.setAudienceData(
        zkTLSService,
        proofProvider,
        appId,
        secret,
        providerId,
        handleKey,
        callback
      ))
    },
    resetCampaign: () => {
      dispatch(
        campaignAsyncActions.resetCampaign()
      )
    },

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

const proofProvidersOptions = [
  {
    title: 'X (Twitter)',
    value: 'x',
    image: <Icons.XIcon />,
  }, {
    title: 'Custom',
    value: 'custom',
    image: <Icons.DropAudienceIcon />
  }
]


const zkTLSServiceOptions = [
  {
    label: `Reclaim`,
    value: 'reclaim'
  }
]

const selectCurrentValue = (
  value: string
) => {
  const currentOption = zkTLSServiceOptions.find(option => option.value === value)
  if (!currentOption) {
    return null
  }
  if (currentOption) {
    return currentOption
  }
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
  setAudienceData,
  resetCampaign
}) => {
  const [
    assetsParsed,
    setAssetsParsedValue
  ] = useState<TAssetsData>([])

  const history = useHistory()
  const { id } = useParams<TLinkParams>()
  const currentCampaign = id ? campaigns.find(campaign => campaign.campaign_id === id) : null
  const currentCampaignSponsored = currentCampaign ? currentCampaign.sponsored : defineDefaultSponsoredValue(chainId as number)

  const [ data, setData ] = useState<TLinksContent>([])

  const [ handleKey, setHandleKey ] = useState<string>('')
  const [ providerID, setProviderID ] = useState<string>('')
  const [ secret, setSecret ] = useState<string>('')
  const [ appID, setAppID ] = useState<string>('')
  const [ proofProvider, setProofProvider ] = useState<TProofProvider>('x')
  const [ zkTLSService, setZkTLSService ] = useState<TZKTLSService>('reclaim')

  useEffect(preventPageClose(), [])

  useEffect(() => {
    resetCampaign()
  }, [])

  useEffect(() => {
    if (!data || decimals === null) { return setAssetsParsedValue([]) }
    let assets = convertLinksContent(data, decimals, claimPattern)
    if (!assets) { return setAssetsParsedValue([]) }
    setAssetsParsedValue(assets)
  }, [data])

  return <Container>
    <Aside>
      <Breadcrumbs
          items={
            [
              {
                title: 'Audience',
                status: 'current'
              }, {
                title: 'Token',
              }, {
                title: 'Drop'
              }, {
                title: 'Launch'
              }
            ]
          }
        />
    </Aside>

    <WidgetComponent title='Choose your audience'>

      <SelectStyled
        onChange={async ({ value }: { value: TZKTLSService}) => {
          setZkTLSService(value)
        }}
        title='ZKTLS Service'
        placeholder='ZKTLS Service'
        value={selectCurrentValue(zkTLSService)}
        options={zkTLSServiceOptions}
      />

      <Text>
        More data sources coming soon. <TextLink href="#">Suggest one</TextLink>
      </Text>
      <AudienceStyled
        onChange={(value) => {
          if (value === 'custom') {
            setHandleKey('')
            setProviderID('')
            setAppID('')
            setSecret('')
          }

          console.log({ value })
          setProofProvider(value)
        }}
        value={proofProvider}
        options={proofProvidersOptions}
      />
      {
        proofProvider === 'custom' && <>
          <InputStyled
            title='Handle ID'
            value={handleKey}
            placeholder='e.g. 123456'
            onChange={(value: string) => {
              setHandleKey(value)
              return value
            }}
          />

          <InputStyled
            title='Provider ID'
            value={providerID}
            placeholder='e.g. 123456'
            onChange={(value: string) => {
              setProviderID(value)
              return value
            }}
          />

          <InputStyled
            title='App ID'
            value={appID}
            placeholder='e.g. 123456'
            onChange={(value: string) => {
              setAppID(value)
              return value
            }}
          />

          <InputStyled
            title='Secret'
            value={secret}
            placeholder='e.g. 123456'
            onChange={(value: string) => {
              setSecret(value)
              return value
            }}
          />
        </>
      }
      

      <ButtonsContainer>
        <ButtonStyled
          appearance='action'
          onClick={() => {
            setAudienceData(
              zkTLSService,
              proofProvider,
              appID,
              secret,
              providerID,
              handleKey,
              () => {
                history.push(`/campaigns/new/ERC20/token-data`)
              }
            )
          }}
          // disabled={!instagramID}
          disabled={false}
        >
          Next
        </ButtonStyled>
      </ButtonsContainer>
    </WidgetComponent>
  </Container>
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateAudience)
