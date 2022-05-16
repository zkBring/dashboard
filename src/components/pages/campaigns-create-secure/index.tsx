import { FC, useState } from 'react'
import {
  Container,
  WidgetComponent,
} from './styled-components'
import { Secure } from './components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import {
  countAssetsTotalAmountERC20,
  defineNativeTokenSymbol
} from 'helpers'
import { LINK_COMISSION_PRICE } from 'configs/app'
import { add, bignumber, multiply } from 'mathjs'

const mapStateToProps = ({
  user: {
    chainId
  },
  campaign: {
    assets,
    symbol
  },
}: RootState) => ({
  assets,
  symbol,
  chainId
})

type ReduxType = ReturnType<typeof mapStateToProps>

const CampaignsCreateSecure: FC<ReduxType> = ({
  assets, symbol, chainId
}) => {
  const [ sponsored, setSponsored ] = useState<boolean>(false)
  if (!assets || !symbol || !chainId) { return null }
  const assetsTotal = countAssetsTotalAmountERC20(assets)
  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })
  const comission = bignumber(String(LINK_COMISSION_PRICE))
  const nativeTokensAmount = !sponsored ? assetsTotal.originalNativeTokensAmount : add(
    assetsTotal.originalNativeTokensAmount,
    (multiply(
      comission,
      assets.length
    ))
  )
  return <Container>
    <WidgetComponent title={`Secure ${nativeTokensAmount} ${nativeTokenSymbol} into Linkdrop Contract`}>
      <Secure
        amount={String(nativeTokensAmount)}
        sponsored={sponsored}
        setSponsored={setSponsored}
        nativeTokenSymbol={nativeTokenSymbol}
      />
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps)(CampaignsCreateSecure)