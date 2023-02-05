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
  AsideStyled
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
  defineProxyContractFunds,
  createEncryptionKey
} from 'helpers'

import { BatchesList, CampaignParameters, HowToUseSDK } from './components'
import { TextLink } from 'components/common'
import Icons from 'icons'
import { useHistory } from 'react-router-dom'
import { getCampaignBatches, downloadLinks } from 'data/store/reducers/campaigns/async-actions'
import { IProps } from './types'
import { IAppDispatch } from 'data/store'
import { decrypt } from 'lib/crypto';
import LinkdropSDK from 'linkdrop-sdk-test'


const mapStateToProps = ({
  campaigns: { campaigns, loading },
  user: { address, dashboardKey, provider },
  campaign: { decimals },
}: RootState) => ({
  campaigns,
  address,
  decimals,
  loading,
  dashboardKey,
  provider
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    getCampaignBatches: (campaign_id: string | number) => {
      dispatch(
        getCampaignBatches({ campaign_id })
      )
    },
    downloadLinks: (
      batch_id: string | number,
      campaign_id: string,
      title: string,
      encryptionKey?: string
    ) => {
      dispatch(
        downloadLinks(batch_id, campaign_id, title, encryptionKey)
      )
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>
type TCampaignStatus = 'paused' | 'pending' | 'active' | 'initial'

const CampaignDetails: FC<ReduxType & IProps & RouteComponentProps> = (props) => {
  const {
    campaigns,
    dashboardKey,
    match: { params },
    getCampaignBatches,
    downloadLinks,
    provider,
    address
  } = props

  const history = useHistory()

  const [ status, setStatus ] = useState<TCampaignStatus>('initial')
  const [ withdrawable, setWithdrawable ] = useState<boolean>(false)

  useEffect(() => {
    getCampaignBatches(params.id)
  }, [])

  useEffect(() => {
    const onInit = async () => {
      const amount = await defineProxyContractFunds(
        proxy_contract_address,
        provider
      )
      console.log({ amount })
      setWithdrawable(amount > 0)
    }
    onInit()
  }, [])

  useEffect(() => {
    const onInit = async () => {
      const status = await defineCampaignStatus(
        proxy_contract_address,
        provider
      )
      setStatus(status)
    }
    onInit()
  }, [])

  const currentCampaign = campaigns.find(campaign => campaign.campaign_id === params.id)

  useEffect(() => {
    const init = async () => {
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
      // const sdk = new LinkdropSDK({
      //   apiKey: {
      //     key: '3b2c12979794fa25bf356e1f36c39a80',
      //     mode: 'server'
      //   },
      //   claimApiUrl: 'https://staging.claim.ledger.com'
      // })
      // const campaign = await sdk.getCampaign(
      //   currentCampaign.campaign_id,
      //   decrypt(currentCampaign.encrypted_signer_key, dashboardKey),
      //   encryptionKey
      // )
      // console.log({ campaign })
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

      // // const deactivated = await sdk.deactivate('0xe80700f612Abc6778fb5a92AeaF028af7B23cCA0')
      // // console.log({ deactivated })
      // // const reactivated = await sdk.reactivate('0xe80700f612Abc6778fb5a92AeaF028af7B23cCA0')
      // // console.log({ reactivated })

      // const claim = await sdk.redeem('fb7734e4fda2e1e2fdc7340ab982d23f0bc3d9db4022083359403be9fd434127', '0x0553aDA5829184A7818dC866367D77334183603E')
      // console.log({ claim, test: 1 })

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
                provider
              )
              if (result === 'paused') {
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
                provider
              )
              if (result === 'active') {
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
                provider
              )
              if (result) {
                setWithdrawable(false)
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
            size='small'
            title='+ Add batch'
            onClick={() => {
              history.push(`/campaigns/edit/${token_standard}/${campaign_id}/new`)
            }}
          />}
        </Header>

        <BatchesList
          batches={batches}
          title={title}
          campaignId={campaign_id}
          sdk={sdk}
          downloadLinks={downloadLinks}
          encryptionKey={encryptionKey}
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
    
    <WidgetContainer>
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
          <TableText>Links</TableText>
          <TableValue>{links_count}</TableValue>
        </TableRow>
      </AsideStyled>

      <AsideStyled
        title="Resources"
        subtitle='Guides on how to install and run Linkdrop SDK'
        next={{
          action: () => {
            
          },
          title: 'Read Docs'
        }}
        back={{
          action: () => {
            
          },
          title: 'View on GitHub',
          appearance: 'action'
        }}
      >
       
      </AsideStyled>
    </WidgetContainer>
  </Container>
}

export default withRouter(connect(mapStateToProps, mapDispatcherToProps)(CampaignDetails))
