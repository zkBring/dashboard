import { FC } from 'react'
import {
  WidgetAside,
} from '../../styled-components'
import { WidgetText, WidgetNote, WidgetTextBlock } from 'components/common'
import {
  TAside,
  TDefineTitle,
  TDefineTotalTitle
} from './types'
import { countAssetsTotalAmountERC20 } from 'helpers'

const renderText: TDefineTitle = (
  symbol,
  totalAmount,
  assets
) => {
  if (!symbol) { return }
  if (symbol === 'ETH') {
    return  <>
      <WidgetText>
        {defineTotalTitle(symbol, totalAmount)}
      </WidgetText>
      <WidgetNote>
        {`${assets.length} links with ${symbol}`}
      </WidgetNote>
    </>
  }
  return <>
    <WidgetTextBlock>
      <WidgetText>
        {defineTotalTitle(symbol, totalAmount)}
      </WidgetText>
    </WidgetTextBlock>
    <WidgetNote>
      Each link contains: {symbol}
    </WidgetNote>
  </>
}

const defineTotalTitle: TDefineTotalTitle = (
  symbol, totalAmount
) => {
  const originalAmount = String(totalAmount.originalAmount)
  const originalNativeTokensAmount = String(totalAmount.originalNativeTokensAmount)
  if (
    originalAmount !== '0' &&
    originalNativeTokensAmount !== '0'
  ) {
    return `${originalAmount} ${symbol} + ${originalNativeTokensAmount} ETH`
  }

  if (
    originalAmount !== '0' &&
    originalNativeTokensAmount === '0'
  ) {
    return `${originalAmount} ${symbol}`
  }

  if (
    originalAmount === '0' &&
    originalNativeTokensAmount !== '0'
  ) {
    return `${originalNativeTokensAmount} ETH`
  }

  return ''
}



const Aside: FC<TAside> = ({
  assets,
  symbol
}) => {
  if (!symbol) {
    return <WidgetAside>
      <WidgetNote>Fill all fields to see the details</WidgetNote>
    </WidgetAside>
  }
  const myAssets = countAssetsTotalAmountERC20(assets, symbol)
  return <WidgetAside>
    <WidgetTextBlock>
      <WidgetText>Total:</WidgetText>
    </WidgetTextBlock>
    <WidgetTextBlock>
      {renderText(
        symbol,
        myAssets,
        assets
      )}
    </WidgetTextBlock>
  </WidgetAside>
}

export default Aside