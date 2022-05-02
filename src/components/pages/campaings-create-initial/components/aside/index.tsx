import { FC } from 'react'
import {
  WidgetAside,
} from '../../styled-components'
import { WidgetText, WidgetNote, WidgetTextBlock } from 'components/common'
import {
  TAside,
  TDefineTotalAmountERC20,
  TTotalAmount,
  TDefineTitle,
  TDefineTotalTitle
} from './types'
import { TAsset } from 'types'
import { add, bignumber } from 'mathjs'

const defineTotalAmountERC20: TDefineTotalAmountERC20 = (assets, symbol) => {
    return assets.reduce<TTotalAmount>((sum: TTotalAmount, item: TAsset) => {
      const { nativeTokensAmount, amount, originalAmount, originalNativeTokensAmount } = item
      return {
        ...sum,
        amount: amount ? add(
          bignumber(item.amount),
          bignumber(sum.amount)
        ) : sum.amount,
        originalAmount: originalAmount ? add(
          bignumber(item.originalAmount),
          bignumber(sum.originalAmount)
        ) : sum.originalAmount,
        nativeTokensAmount: nativeTokensAmount ? add(
          bignumber(item.nativeTokensAmount),
          bignumber(sum.nativeTokensAmount)
        ) : sum.nativeTokensAmount,
        originalNativeTokensAmount: originalNativeTokensAmount ? add(
          bignumber(item.originalNativeTokensAmount),
          bignumber(sum.originalNativeTokensAmount)
        ) : sum.originalNativeTokensAmount
      }  
    }, {
    nativeTokensAmount: bignumber('0'),
    amount: bignumber('0'),
    originalNativeTokensAmount: bignumber('0'),
    originalAmount: bignumber('0')
  })
}

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
  const myAssets = defineTotalAmountERC20(assets, symbol)
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