import { FC, useEffect, useState } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import {
  TableRow,
  TableText,
  TableValue,
  WidgetContainer,
  Aside,
  EditableWidget
} from 'components/pages/common'
import {
  AsideWidgetStyled,
  AsideButton,
  AsideButtonsContainer,
  Container
} from './styled-components'
import {
  shortenString,
  defineExplorerUrl,
  defineCampaignStatus,
  formatDate,
  formatTime
} from 'helpers'
import {
  LinksStats,
  Reclaim,
  BringAmount,
  Status,
  EditPopup
} from './components'
import { useHistory } from 'react-router-dom'
import {
  getCampaignBatches,
  downloadReport,
  updateDescription
} from 'data/store/reducers/campaigns/async-actions'
import * as userAsyncActions from 'data/store/reducers/user/async-actions/index'
import { TextLink } from 'components/common'
import { IProps, TCampaignStatus } from './types'
import { IAppDispatch } from 'data/store'
const {
  REACT_APP_PLATFORM_APP_URL
} = process.env

const mapStateToProps = ({
  campaigns: {
    campaigns,
    loading
  },
  user: {
    address,
    dashboardKey,
    signer,
    jsonRPCProvider,
    chainId,
    countries
  },
  campaign: {
    decimals,
    loading: campaignLoading,
    approved
  },
}: RootState) => ({
  campaigns,
  address,
  countries,
  decimals,
  campaignLoading,
  loading,
  dashboardKey,
  signer,
  provider: jsonRPCProvider,
  chainId,
  approved
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    getCampaignBatches: (
      campaign_id: string | number,
      callback: () => Promise<void>
    ) => {
      dispatch(
        getCampaignBatches({ campaign_id, callback })
      )
    },

    downloadReport: (
      campaign_id: string
    ) => {
      dispatch(
        downloadReport(
          campaign_id
        )
      )
    },

    updateCampaign: (
      campaign_id: string,
      description: string,
      isPublic: boolean,
      callback?: () => void
    ) => {
      dispatch(
        updateDescription(
          campaign_id,
          description,
          isPublic,
          callback
        )
      )
    }
  }
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>


const Campaign: FC<ReduxType & IProps & RouteComponentProps> = ({
  campaigns,
  dashboardKey,
  match: { params },
  getCampaignBatches,
  downloadReport,
  updateCampaign,
  signer,
  address,
  provider,
  chainId,
  countries,
  loading,
  approved
}) => {

  const history = useHistory()

  const [ status, setStatus ] = useState<TCampaignStatus>('initial')

  const [ editPopup, setEditPopup ] = useState<boolean>(false)

  // @ts-ignore
  const currentCampaign = campaigns.find(campaign => campaign.campaign_id === params.id)

  if (!currentCampaign) {
    return null
  }

  const {
    campaign_id,
    token_standard,
    title,
    creator_address,
    token_address,
    proxy_contract_address,
    description,
    chain_id,
    links_count,
    sponsored,
    links_claimed,
    symbol,
    created_at,
    qr_campaign,
    is_public
  } = currentCampaign

  useEffect(() => {
    const init = async () => {
      const status = await defineCampaignStatus(
        proxy_contract_address,
        signer,
      )
      setStatus(status)
    }
    init()
  }, [])

  const tokenUrl = defineExplorerUrl(Number(chain_id), `/address/${token_address || ''}`)
  const ownerUrl = defineExplorerUrl(Number(chain_id), `/address/${creator_address || ''}`)
  const contractUrl = defineExplorerUrl(Number(chain_id), `/address/${proxy_contract_address || ''}`)

  return <Container>

    {editPopup && <EditPopup
      initialValue={description}
      loading={loading}
      onUpdate={(value) => {
        updateCampaign(
          campaign_id,
          value,
          is_public,
          () => {
            setEditPopup(false)
          }
        )
      }}
      onClose={() => {
        setEditPopup(false)
      }}
    />}
    <WidgetContainer>
      <LinksStats
        linksAmount={links_count}
        linksClaimed={links_claimed}
        sponsored={sponsored}
      />

      <BringAmount
        isPublic={is_public}
        action={(value) => {
          updateCampaign(
            campaign_id,
            description,
            value,
            () => {}
          )
        }}
      />
      
      <Reclaim
        reclaimId={qr_campaign}
        campaignId={campaign_id}
        title={title}
      />

    </WidgetContainer>

    <Aside>
      <Status
        status={status}
        setStatus={setStatus}
        campaign={currentCampaign}
      />
      <AsideWidgetStyled
        title="Campaign"
      >
        {created_at && <TableRow>
          <TableText>Created at</TableText>
          <TableValue>
            {formatDate(created_at as string)}, {formatTime(created_at as string)}
          </TableValue>
        </TableRow>}
      
        <TableRow>
          <TableText>Creator</TableText>
          <TableValue>
            {ownerUrl ? <TextLink href={ownerUrl} target='_blank'>{shortenString(creator_address)}</TextLink> : shortenString(creator_address)}
          </TableValue>
        </TableRow>

        <TableRow>
          <TableText>{symbol} address</TableText>
          <TableValue>
            {tokenUrl ? <TextLink href={tokenUrl} target='_blank'>{shortenString(token_address)}</TextLink> : shortenString(token_address)}
          </TableValue>
        </TableRow>

        <TableRow>
          <TableText>Drop contract</TableText>
          <TableValue>
            {contractUrl ? <TextLink href={contractUrl} target='_blank'>{shortenString(proxy_contract_address)}</TextLink> : shortenString(proxy_contract_address)}
          </TableValue>
        </TableRow>

        <TableRow>
          <TableText>Token standard</TableText>
          <TableValue>{token_standard}</TableValue>
        </TableRow>

        <AsideButtonsContainer>
          <AsideButton
            size='extra-small'
            appearance='additional'
            onClick={() => downloadReport(campaign_id)}
          >
            Download full report
          </AsideButton>

          <AsideButton
            size='extra-small'
            target='_blank'
            appearance='additional'
            href={`${REACT_APP_PLATFORM_APP_URL}/drops/${campaign_id}`}
          >
            Public page
          </AsideButton>
        </AsideButtonsContainer>

      </AsideWidgetStyled>

      <EditableWidget
        value={description}
        title="Description"
        action={() => {
          setEditPopup(true)
        }}
      />

    </Aside>

    
      
  </Container>
}

// @ts-ignore
export default withRouter(connect(mapStateToProps, mapDispatcherToProps)(Campaign))
