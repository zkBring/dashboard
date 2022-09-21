import { FC, useState } from 'react'
import { Secure } from './components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import {
  countAssetsTotalAmountERC20,
  defineNativeTokenSymbol
} from 'helpers'
import { LINK_COMISSION_PRICE } from 'configs/app'
import { add, bignumber, multiply } from 'mathjs'
import { useParams } from 'react-router-dom'
import { TLinkParams } from 'types'
import {
  WidgetComponent,
  Container,
  Aside
} from 'components/pages/common'

const mapStateToProps = ({
  user: {
    chainId
  },
  campaigns: {
    campaigns
  },
  campaign: {
    assets,
    symbol
  },
}: RootState) => ({
  assets,
  symbol,
  chainId,
  campaigns
})

type ReduxType = ReturnType<typeof mapStateToProps>

const CampaignsCreateSecure: FC<ReduxType> = ({
  assets, symbol, chainId, campaigns
}) => {
  const [ sponsored, setSponsored ] = useState<boolean>(true)
  const { id } = useParams<TLinkParams>()
  if (!assets || !symbol || !chainId) { return null }
  const assetsTotal = countAssetsTotalAmountERC20(assets)
  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })
  const comission = bignumber(String(LINK_COMISSION_PRICE))
  const nativeTokensAmount = !sponsored ? assetsTotal.original_native_tokens_amount : add(
    assetsTotal.original_native_tokens_amount,
    (multiply(
      comission,
      assets.length
    ))
  )
  
  const currentCampaign = id ? campaigns.find(campaign => campaign.campaign_id === id) : null
  return <Container>
    <WidgetComponent title='Additional options'>
      <Secure
        amount={String(nativeTokensAmount)}
        sponsored={sponsored}
        setSponsored={setSponsored}
        nativeTokenSymbol={nativeTokenSymbol}
        campaign={currentCampaign}
      />
      {/* <WidgetButton
        title='Send'
        appearance='action'
        onClick={() => {
          secure(
            sponsored,
            amount,
            () => {
              const redirectURL = campaign ? `/campaigns/edit/${tokenStandard}/${campaign.campaign_id}/generate` : `/campaigns/new/${tokenStandard}/generate`
              history.push(redirectURL)
            }
          )
        }}
      /> */}
    </WidgetComponent>
    <Aside
      back={{
        action: () => {}
      }}
      next={{
        action: () => {
          // const redirectURL = campaign ? `/campaigns/edit/${tokenStandard}/${campaign.campaign_id}/generate` : `/campaigns/new/${tokenStandard}/generate`
          //       history.push(redirectURL)
        },
        disabled: false
      }}
      title="Summary"
      subtitle="Check your campaign’s details before going next"
    >
    </Aside>
  </Container>
}

export default connect(mapStateToProps)(CampaignsCreateSecure)