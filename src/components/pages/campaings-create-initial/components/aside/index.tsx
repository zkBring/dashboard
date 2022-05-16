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
import {
  countAssetsTotalAmountERC20,
  countAssetsTotalAmountERC721
} from 'helpers'
import { TDefineAssetsTotalAmount } from 'types'

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
  symbol,
  totalAmount
) => {
  if (totalAmount.originalAmount) {
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
  } else {
    return ''
  }
  

  return ''
}

const countAssetsTotalAmount: TDefineAssetsTotalAmount = (assets, type) => {
  if (type === 'erc20') {
    return countAssetsTotalAmountERC20(assets)
  } else {
    return countAssetsTotalAmountERC721(assets)
  }
}

const Aside: FC<TAside> = ({
  assets,
  symbol,
  type
}) => {
  if (!symbol) {
    return <WidgetAside>
      <WidgetNote>Fill all fields to see the details</WidgetNote>
    </WidgetAside>
  }
  const myAssets = countAssetsTotalAmount(assets, type)
  console.log({ assets })
  return <WidgetAside>
    <WidgetTextBlock>
      <WidgetText>Total: {assets.length} link(s)</WidgetText>
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