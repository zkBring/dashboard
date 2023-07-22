import { FC, useEffect, useState } from 'react'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom'
import {
  AsideDivider,
  TableRow,
  TableText,
  TableValue,
  WidgetComponent,
  Container,
  WidgetContainer
} from 'components/pages/common'
import {
  Header,
  WidgetButton,
  WidgetTitleStyled,
  AsideStyled,
  AsideContainer,
  AsideButton,
  AsideButtonsContainer
} from './styled-components'
import {
  shortenString,
  defineNetworkName,
  defineEtherscanUrl,
  defineCampaignStatus,
  campaignPause,
  campaignUnpause,
  campaignRefund,
  copyToClipboard,
  defineContractFunds,
  createEncryptionKey
} from 'helpers'
import { BatchesList, CampaignParameters, HowToUseSDK } from './components'
import { TextLink } from 'components/common'
import Icons from 'icons'
import { useHistory } from 'react-router-dom'
import { getCampaignBatches, downloadLinks, downloadReport } from 'data/store/reducers/campaigns/async-actions'
import { IProps } from './types'
import { IAppDispatch } from 'data/store'
import { decrypt } from 'lib/crypto'
import { plausibleApi } from 'data/api'
import { TClaimPattern, TTokenType } from 'types'

const mapStateToProps = ({
  campaigns: { campaigns, loading },
  user: { address, dashboardKey, signer, jsonRPCProvider },
  campaign: { decimals },
}: RootState) => ({
  campaigns,
  address,
  decimals,
  loading,
  dashboardKey,
  signer,
  provider: jsonRPCProvider
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    getCampaignBatches: (campaign_id: string | number) => {
      dispatch(
        getCampaignBatches({ campaign_id })
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
    downloadLinks: (
      batch_id: string | number,
      campaign_id: string,
      title: string,
      tokenAddress: string | null,
      chainId: number,
      tokenType: TTokenType,
      sdk: boolean,
      sponsored: boolean,
      claimPattern: TClaimPattern,
      wallet: string,
      encryptionKey?: string
    ) => {
      dispatch(
        downloadLinks(
          batch_id,
          campaign_id,
          title,
          tokenAddress,
          chainId,
          tokenType,
          sdk,
          sponsored,
          claimPattern,
          wallet,
          encryptionKey
        )
      )
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>
type TCampaignStatus = 'paused' | 'pending' | 'active' | 'initial'

const CampaignDetails: FC<ReduxType & IProps & RouteComponentProps> = ({
  campaigns,
  dashboardKey,
  match: { params },
  getCampaignBatches,
  downloadLinks,
  downloadReport,
  signer,
  address,
  provider
}) => {

  const history = useHistory()

  const [ status, setStatus ] = useState<TCampaignStatus>('initial')
  const [ withdrawable, setWithdrawable ] = useState<boolean>(false)

  useEffect(() => {
    getCampaignBatches(params.id)
  }, [])

  useEffect(() => {
    const onInit = async () => {
      const amount = await defineContractFunds(
        proxy_contract_address,
        provider
      )
      setWithdrawable(amount > 0)
    }
    onInit()
  }, [])

  useEffect(() => {
    const onInit = async () => {
      const status = await defineCampaignStatus(
        proxy_contract_address,
        signer
      )
      setStatus(status)
    }
    onInit()
  }, [])

  const currentCampaign = campaigns.find(campaign => campaign.campaign_id === params.id)

  useEffect(() => {
    const init = async () => {
      // !!! THE COMMENTED SECTION OF THE CODE IS NEEDED TO TEST THE SDK UPDATES
      // if (!currentCampaign || !dashboardKey) { return }
      // const encryptionKey = createEncryptionKey(
      //   dashboardKey,
      //   currentCampaign.signer_address,
      //   currentCampaign.campaign_number
      // )
      // console.log(
      //   currentCampaign.campaign_id,
      //   decrypt(currentCampaign.encrypted_signer_key, dashboardKey),
      //   encryptionKey.replace('0x', '')
      // )
      // console.log({ signer: new ethers.Wallet(decrypt(currentCampaign.encrypted_signer_key, dashboardKey)) })
      // const sdk = new LinkdropSDK({
      //   apiHost: 'https://dev.dashboard-api.linkdrop.io'
      // })
      // console.log({ sdk })
      // const campaign = await sdk.getCampaign(
      //   currentCampaign.campaign_id,
      //   decrypt(currentCampaign.encrypted_signer_key, dashboardKey),
      //   encryptionKey
      // )
      // console.log({ campaign })
      // if (!campaign) { return }
      // const newBatch = await campaign.createBatch(
      //   [{ 
      //     id: '0x10ae0a185dd6eaef2a3692c42ae52d4e8b1c4e6d',
      //     amount: '1',
      //     links: '1'
      //   }]
      // )
      // const batches = await campaign?.getBatches()
      // console.log({ batches })
      // if (!batches || !batches.batches) { return }
      // const batchLast = batches.batches[batches.batches.length - 1]
      // console.log({ batchLast })
      // if (!batchLast) { return }
      // const batch = await campaign?.getBatch(batchLast.batch_id)
      // console.log({ batch })
      // if (!batch) { return }
      // const links = batch.getLinks()
      
      // console.log({ links })
      // if (!links) { return }
      // const lastLink = links[links.length - 1]
      // console.log({ lastLink })
      // if (!lastLink) { return }
      // const status = await sdk.getLinkStatus(lastLink.linkId)
      // console.log({ status })

      // const deactivated = await campaign.deactivate('0xe80700f612Abc6778fb5a92AeaF028af7B23cCA0')
      // console.log({ deactivated })
      // const reactivated = await campaign.reactivate('0xe80700f612Abc6778fb5a92AeaF028af7B23cCA0')
      // console.log({ reactivated })

      // const claim = await sdk.redeem('6bd57626fa2633d2c9f907a35c661b0142daf68efcc45a048ff67f9f949a9a74', '0x0553aDA5829184A7818dC866367D77334183603E')
      // console.log({ claim })

    }
    init()
  }, [])
  
  if (!currentCampaign || !dashboardKey) {
    return null
  }

  const {
    campaign_id,
    token_standard,
    title,
    batches,
    creator_address,
    token_address,
    proxy_contract_address,
    claim_pattern,
    chain_id,
    links_count,
    sdk,
    signer_address,
    campaign_number,
    encrypted_signer_key,
    wallet,
    sponsored,
    links_claimed
  } = currentCampaign

  const encryptionKey = createEncryptionKey(
    dashboardKey,
    signer_address,
    campaign_number
  )


  const tokenUrl = defineEtherscanUrl(Number(chain_id), `/address/${token_address || ''}`)
  const ownerUrl = defineEtherscanUrl(Number(chain_id), `/address/${creator_address || ''}`)
  const contractUrl = defineEtherscanUrl(Number(chain_id), `/address/${proxy_contract_address || ''}`)
  const copyToClipboardButton = {
    title: 'Copy debug data',
    icon: <Icons.ClipboardCopyIcon />,
    action: () => {
      copyToClipboard({
        value: {
          chainId: currentCampaign.chain_id,
          proxyAddress: currentCampaign.proxy_contract_address,
          campaignNumber: currentCampaign.campaign_number,
          creatorAddress: currentCampaign.creator_address,
          paused: String(status),
          tokenAddress: currentCampaign.token_address,
          type: currentCampaign.token_standard,
          pattern: currentCampaign.claim_pattern,
          createdAt: currentCampaign.created_at
        }
      })
    }
  }
  

  const defineOptions = () => {
    if (status === 'active') {
      return [
        {
          title: 'Pause',
          icon: <Icons.PauseIcon />,
          action: async () => {
            try {
              setStatus('pending')
              const result = await campaignPause(
                proxy_contract_address,
                address,
                signer
              )
              if (result === 'paused') {
                plausibleApi.invokeEvent({
                  eventName: 'camp_pause',
                  data: {
                    network: defineNetworkName(chain_id),
                    token_type: token_standard as string,
                    claim_pattern: claim_pattern,
                    distribution: sdk ? 'sdk' : 'manual',
                    preferred_wallet: currentCampaign.wallet
                  }
                })
                setStatus('paused')
              }
            } catch (e) {
              setStatus('active')
              console.error(e)
            }
          }
        },
        {
          title: 'Refund',
          icon: <Icons.RefundIcon />,
          disabled: true,
          bordered: true
        },
        copyToClipboardButton
      ]
    }

    if (status === 'paused') {
      return [
        {
          title: 'Unpause',
          icon: <Icons.UnpauseIcon />,
          action: async () => {
            try {
              setStatus('pending')
              const result = await campaignUnpause(
                proxy_contract_address,
                address,
                signer
              )
              if (result === 'active') {
                plausibleApi.invokeEvent({
                  eventName: 'camp_unpause',
                  data: {
                    network: defineNetworkName(chain_id),
                    token_type: token_standard as string,
                    claim_pattern: claim_pattern,
                    distribution: sdk ? 'sdk' : 'manual',
                    preferred_wallet: currentCampaign.wallet
                  }
                })
                setStatus('active')
              }
            } catch (e) {
              setStatus('paused')
              console.error(e)
            }
          }
        },
        {
          title: 'Refund',
          icon: <Icons.RefundIcon />,
          bordered: true,
          disabled: !withdrawable,
          action: async () => {
            const currentStatus = status
            try {
              setStatus('pending')
              const result = await campaignRefund(
                proxy_contract_address,
                address,
                signer,
                provider
              )
              if (result) {
                setWithdrawable(false)
                plausibleApi.invokeEvent({
                  eventName: 'camp_refund',
                  data: {
                    network: defineNetworkName(chain_id),
                    token_type: token_standard as string,
                    claim_pattern: claim_pattern,
                    distribution: sdk ? 'sdk' : 'manual',
                    preferred_wallet: currentCampaign.wallet
                  }
                })
                setStatus(currentStatus)
              }
            } catch (e) {
              setStatus(currentStatus)
              console.error(e)
            }  
          }
        },
        copyToClipboardButton
      ]
    }
    return []
  }

  const defineStatusTitle = () => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'initial':
        return '-'
      case 'paused':
        return 'Paused'
      case 'pending':
        return 'Pending'
    }
  }

  return <Container>
    <WidgetContainer>

      <WidgetComponent>
        <Header>
          <WidgetTitleStyled>{title || `Campaign ${campaign_id}`}</WidgetTitleStyled>
          {!sdk && <WidgetButton
            appearance='additional'
            size='extra-small'
            title='+ Add batch'
            onClick={() => {
              history.push(`/campaigns/edit/${token_standard}/${campaign_id}/new`)
            }}
          />}
        </Header>

        <BatchesList
          batches={batches}
          sponsored={sponsored}
          title={title}
          campaignId={campaign_id}
          sdk={sdk}
          downloadLinks={(
            batchId,
            campaignId,
            title,
            tokenAddress,
            sponsored,
            encryptionKey
          ) => {

            downloadLinks(
              batchId,
              campaignId,
              title,
              tokenAddress,
              chain_id,
              token_standard,
              sdk,
              sponsored,
              claim_pattern,
              wallet,
              encryptionKey
            )
          }}
          encryptionKey={encryptionKey}
          tokenAddress={token_address}
        />
        
      </WidgetComponent>

      <CampaignParameters
        campaignId={campaign_id}
        chainId={chain_id}
        encryptionKey={encryptionKey}
        sdk={sdk}
        masterAddress={creator_address}
        signingKey={decrypt(encrypted_signer_key, dashboardKey)}
      />
      <HowToUseSDK sdk={sdk} />
    </WidgetContainer>
    
    <AsideContainer>
      <AsideStyled
        title="Campaign"
        options={defineOptions()}
        loading={status === 'pending' || status === 'initial'}
      >
        <TableRow>
          <TableText>Created by</TableText>
          <TableValue><TextLink href={ownerUrl} target='_blank'>{shortenString(creator_address)}</TextLink></TableValue>
        </TableRow>
        {status !== null && <TableRow>
          <TableText>Status</TableText>
          <TableValue>{defineStatusTitle()}</TableValue>
        </TableRow>}

        <AsideDivider />

        <TableRow>
          <TableText>Token address</TableText>
          <TableValue><TextLink href={tokenUrl} target='_blank'>{shortenString(token_address)}</TextLink></TableValue>
        </TableRow>
        <TableRow>
          <TableText>Campaign contract</TableText>
          <TableValue><TextLink href={contractUrl} target='_blank'>{shortenString(proxy_contract_address)}</TextLink></TableValue>
        </TableRow>

        <AsideDivider />

        <TableRow>
          <TableText>Claim pattern</TableText>
          <TableValue>{claim_pattern}</TableValue>
        </TableRow>

        <AsideDivider />

        <TableRow>
          <TableText>Network</TableText>
          <TableValue>{defineNetworkName(Number(chain_id))}</TableValue>
        </TableRow>
        <TableRow>
          <TableText>Token standard</TableText>
          <TableValue>{token_standard}</TableValue>
        </TableRow>
        <TableRow>
          <TableText>Links amount</TableText>
          <TableValue>{links_count}</TableValue>
        </TableRow>
        {sponsored && <TableRow>
          <TableText>Links claimed</TableText>
          <TableValue>{links_claimed}</TableValue>
        </TableRow>}
        <TableRow>
          <TableText>Sponsorship</TableText>
          <TableValue>{sponsored ? 'Enabled' : 'Disabled'}</TableValue>
        </TableRow>

        {sponsored && <AsideButtonsContainer>
          <AsideButton
            onClick={() => downloadReport(campaign_id)}
          >
            <Icons.DownloadReportIcon />
            Download full report
          </AsideButton>
        </AsideButtonsContainer>}
        
      </AsideStyled>

      <AsideStyled
        title="Resources"
        subtitle='Guides on how to install and run Linkdrop SDK'
      >
       <AsideButton
          onClick={() => {
              plausibleApi.invokeEvent({
                eventName: 'view_docs'
              })
              window.open(`https://docs.linkdrop.io/sdk`, '_blank')
          }}
        >
          Read Docs
        </AsideButton>
      </AsideStyled>
    </AsideContainer>
  </Container>
}

export default withRouter(connect(mapStateToProps, mapDispatcherToProps)(CampaignDetails))
