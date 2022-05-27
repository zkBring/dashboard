import {
  FC
} from 'react'
import {
  Campaign,
  CampaignRow,
  CampaignText,
  CampaignValue,
  CampaignType,
  CampaignButtons,
  CampaignButton
} from './styled-components'
import {
  countAssetsTotalAmountERC20,
  formatDate,
  defineNativeTokenSymbol,
  defineEtherscanUrl
} from 'helpers'
import { TAsset, TTokenType, TLink } from 'types'

type TProps = {
  date: string,
  assets: TAsset[],
  id: string,
  symbol: string,
  chainId: number,
  type: TTokenType,
  links: TLink[],
  proxyAddress: string
}

type TDefineTitle = (
  type: TTokenType,
  assets: TAsset[],
  symbol: string,
  chainId: number
) => string

const defineTitle: TDefineTitle = (
  type,
  assets,
  symbol,
  chainId
) => {
  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId })
  const totalAmount = countAssetsTotalAmountERC20(assets)
  if (type === 'erc20') {
    if (symbol === nativeTokenSymbol) {
      // раздача native tokens
      return `${totalAmount.originalNativeTokensAmount} ${nativeTokenSymbol}`
    }
    if (String(totalAmount.originalAmount) !== '0') {
      // раздача erc-20 tokens
      if (String(totalAmount.originalNativeTokensAmount) !== '0') {
        // раздача erc-20 tokens + native tokens
        return `${totalAmount.originalAmount} ${symbol} + ${totalAmount.originalNativeTokensAmount} ${nativeTokenSymbol}`
      }
      return `${totalAmount.originalAmount} ${symbol}`
    }
  }
  if (type === 'erc721') {
    if (String(totalAmount.originalNativeTokensAmount) !== '0') {
      // раздача erc-20 tokens + native tokens
      return `${symbol} + ${totalAmount.originalNativeTokensAmount} ${nativeTokenSymbol}`
    }
    return symbol
  }

  if (type === 'erc1155') {
    if (String(totalAmount.originalNativeTokensAmount) !== '0') {
      // раздача erc-20 tokens + native tokens
      return `${symbol} + ${totalAmount.originalNativeTokensAmount} ${nativeTokenSymbol}`
    }
    return symbol
  }
  return ''
}

const CampaignComponent: FC<TProps> = ({
  assets,
  date,
  id,
  symbol,
  chainId,
  type,
  links,
  proxyAddress
}) => {
  const title = defineTitle(
    type,
    assets,
    symbol,
    chainId
  )
  const dateFormatted = formatDate(date)
  const scanUrl = defineEtherscanUrl(chainId, `/address/${proxyAddress}`)
  return <Campaign title={title}>
    <CampaignType>{type}</CampaignType>
    <CampaignRow>
      <CampaignText>Created: </CampaignText><CampaignValue>{dateFormatted}</CampaignValue>
    </CampaignRow>
    <CampaignRow>
      <CampaignText>{links.length} link(s) / {title}</CampaignText>
    </CampaignRow>
    <CampaignButtons>
      <CampaignButton
        to={`/campaigns/${id}`}
        title="Links"
        appearance='action'
      />
      <CampaignButton
        title='View Contract'
        href={scanUrl}
        target='_blank'
        appearance='action-inverted'
      />
    </CampaignButtons>  
  </Campaign>
}

export default CampaignComponent