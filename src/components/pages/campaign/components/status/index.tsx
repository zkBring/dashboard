import {
  FC,
  useEffect,
  useState
} from 'react'
import {
  campaignPause,
  campaignUnpause,
  campaignRefund,
  copyToClipboard,
  defineContractFunds
} from 'helpers'
import Icons from 'icons'
import TProps from './types'
import { RootState } from 'data/store'
import {
  AsideWidgetStyled
} from '../../styled-components'
import { connect } from 'react-redux'
import {
  Text
} from './styled-components'

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

type ReduxType = ReturnType<typeof mapStateToProps>

const Status: FC<TProps & ReduxType> = ({
  campaign,
  provider,
  address,
  signer,
  status,
  setStatus
}) => {

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

  const [withdrawable, setWithdrawable] = useState<boolean>(false)

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
    additional_wallets_on,
    encrypted_signer_key,
    wallet,
    sponsored,
    links_claimed,
    available_countries_on,
    available_countries,
    collection_id,
    expiration_date,
    claiming_finished_button_title,
    claiming_finished_button_url,
    claiming_finished_button_on,
    claiming_finished_auto_redirect,
    preferred_wallet_on,
    claim_host,
    claim_host_on,
    multiple_claims_on,
    token_id,
    symbol,
    created_at
  } = campaign

  const copyToClipboardButton = {
    title: 'Copy debug data',
    icon: <Icons.ClipboardCopyIcon />,
    action: () => {
      copyToClipboard({
        value: {
          chainId: chain_id,
          proxyAddress: proxy_contract_address,
          campaignNumber: campaign_number,
          creatorAddress: creator_address,
          paused: String(status),
          tokenAddress: token_address,
          type: token_standard,
          pattern: claim_pattern,
          createdAt: created_at
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

  return <AsideWidgetStyled
    title="Drop status"
    options={defineOptions()}
    loading={status === 'pending' || status === 'initial'}
  >

    <Text>{status}</Text>
    
  </AsideWidgetStyled>
}

export default connect(mapStateToProps)(Status)