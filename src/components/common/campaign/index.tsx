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
  countAssetsTotalAmountERC1155,
  countAssetsTotalAmountERC721,
  formatDate,
  defineNativeTokenSymbol,
  defineEtherscanUrl
} from 'helpers'
import { TAsset, TTokenType, TLinksBatch } from 'types'

type TProps = {
  date: string,
  assets: TAsset[],
  id: string,
  symbol: string,
  chainId: number,
  type: TTokenType,
  batches: TLinksBatch[],
  proxyContractAddress: string,
  title: string
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
  
  if (type === 'erc20') {
    const totalAmount = countAssetsTotalAmountERC20(assets)
    if (symbol === nativeTokenSymbol) {
      // раздача native tokens
      return `${totalAmount.original_native_tokens_amount} ${nativeTokenSymbol}`
    }
    if (String(totalAmount.original_amount) !== '0') {
      // раздача erc-20 tokens
      if (String(totalAmount.original_native_tokens_amount) !== '0') {
        // раздача erc-20 tokens + native tokens
        return `${totalAmount.original_amount} ${symbol} + ${totalAmount.original_native_tokens_amount} ${nativeTokenSymbol}`
      }
      return `${totalAmount.original_amount} ${symbol}`
    }
  }
  if (type === 'erc721') {
    const totalAmount = countAssetsTotalAmountERC721(assets)
    if (String(totalAmount.original_native_tokens_amount) !== '0') {
      // раздача erc-20 tokens + native tokens
      return `${symbol} + ${totalAmount.original_native_tokens_amount} ${nativeTokenSymbol}`
    }
    return symbol
  }

  if (type === 'erc1155') {
    const totalAmount = countAssetsTotalAmountERC1155(assets)
    if (String(totalAmount.original_native_tokens_amount) !== '0') {
      // раздача erc-20 tokens + native tokens
      return `${symbol} + ${totalAmount.original_native_tokens_amount} ${nativeTokenSymbol}`
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
  batches,
  proxyContractAddress,
  title
}) => {
  const description = defineTitle(
    type,
    assets,
    symbol,
    chainId
  )
  const dateFormatted = formatDate(date)
  const scanUrl = defineEtherscanUrl(chainId, `/address/${proxyContractAddress}`)
  return <Campaign title={title || 'No name'}>
    <CampaignType>{type}</CampaignType>
    <CampaignRow>
      <CampaignText>Created: </CampaignText><CampaignValue>{dateFormatted}</CampaignValue>
    </CampaignRow>
    <CampaignRow>
      <CampaignText>{description}</CampaignText>
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