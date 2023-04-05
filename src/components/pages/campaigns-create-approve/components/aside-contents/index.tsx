import { FC } from 'react'
import { TAsideContentsProps } from './types'
import {
  AsideNote,
  ApprovedIcon,
  LoaderStyled,
  NoteStyled
} from './styled-components'
import {
  TableRow,
  TableText,
  TableValue,
  AsideContent,
  TableValueShorten,
  AssetsList,
  AsideDivider
} from 'components/pages/common'
import { TextLink } from 'components/common'
import {
  defineEtherscanUrl,
  shortenString,
  defineNetworkName,
  defineNativeTokenSymbol
} from 'helpers'
import { TAssetsData, TTokenType, TClaimPattern, TTotalAmount } from 'types'
import { MathType } from 'mathjs'
import { TLinksContent } from '../../types'


const renderTotalLinksSegment = (
  sdk: boolean,
  sponsored: boolean,
  assetsParsed: TAssetsData
) => {
  if (sdk && !sponsored) { return null }
  return <TableRow>
    <TableText>Total links</TableText>
    <TableValue>{assetsParsed.length}</TableValue>
  </TableRow>

}

const renderSecureAmount = (
  sponsored: boolean,
  totalComission: MathType,
  nativeTokenSymbol: string
) => {
  if (!sponsored) {
    return null
  }
  return <>
    <AsideDivider />
    <TableRow>
      <TableText>To be secured (sponsorship)</TableText>
      <TableValue>{String(totalComission)} {nativeTokenSymbol}</TableValue>
    </TableRow>
  </>
}

const renderApproveAmount = (
  symbol: string | null,
  campaignTokenStandard: TTokenType | null,
  claimPattern: TClaimPattern,
  totalAmount?: TTotalAmount
) => {
  if (claimPattern === 'mint' || !campaignTokenStandard || campaignTokenStandard === 'ERC1155' || campaignTokenStandard === 'ERC721' || !totalAmount || !symbol) {
    return null
  }
  const totalToApprove = totalAmount.original_amount
  return <TableRow>
    <TableText>To be approved</TableText>
    <TableValue>{String(totalToApprove)} {symbol}</TableValue>
  </TableRow>
}

const renderAssetsList = (
  sdk: boolean,
  campaignTokenStandard: TTokenType | null,
  data: TLinksContent,
  claimPattern: TClaimPattern
) => {
  if (sdk || !campaignTokenStandard) { return null }
  return <AssetsList
    claimPattern={claimPattern}
    data={data}
    type={campaignTokenStandard}
  />
}

const renderTotal = (
  totalComission: MathType,
  nativeTokenSymbol: string
) => {
  return <TableRow>
    <TableText>Total amount</TableText>
    <TableValue>{String(totalComission)} {nativeTokenSymbol}</TableValue>
  </TableRow>
}

const AsideContents: FC<TAsideContentsProps> = ({
  approved,
  campaignTitle,
  tokenAddress,
  campaignSymbol,
  campaignTokenStandard,
  campaignChainId,
  claimPattern,
  assetsParsed,
  sdk,
  data,
  sponsored,
  totalComission,
  symbol,
  totalAmount
}) => {
  const scannerUrl = defineEtherscanUrl(campaignChainId, `/address/${tokenAddress || ''}`)
  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId: campaignChainId })

  const approvedNote = () => {
    if (approved === null) {
      return <AsideNote>
        <LoaderStyled />
        Сhecking approval...
      </AsideNote>
    }

    if (approved) {
      return <AsideNote>
        <ApprovedIcon />
        Token has been approved before
      </AsideNote>
    }
    return null
  }

  return <>
    <AsideContent>
      <TableRow>
        <TableText>Title of campaign</TableText>
        <TableValueShorten>{campaignTitle}</TableValueShorten>
      </TableRow>

      {tokenAddress && <TableRow>
        <TableText>Token address</TableText>
        <TableValue>
          <TextLink href={scannerUrl} target='_blank'>{shortenString(tokenAddress)}</TextLink>
        </TableValue>
      </TableRow>}

      {campaignSymbol && <TableRow>
        <TableText>Token Name</TableText>
        <TableValue>{campaignSymbol}</TableValue>
      </TableRow>}

      {campaignTokenStandard && <TableRow>
        <TableText>Token standard</TableText>
        <TableValue>{campaignTokenStandard}</TableValue>
      </TableRow>}

      {campaignChainId && <TableRow>
        <TableText>Network</TableText>
        <TableValue>{defineNetworkName(Number(campaignChainId))}</TableValue>
      </TableRow>}

      {renderAssetsList(
        sdk,
        campaignTokenStandard,
        data,
        claimPattern
      )}

      {sdk && <AsideDivider />}

      {renderTotalLinksSegment(sdk, sponsored, assetsParsed)}

      <TableRow>
        <TableText>Claim pattern</TableText>
        <TableValue>{claimPattern}</TableValue>
      </TableRow>
      {renderSecureAmount(sponsored, totalComission, nativeTokenSymbol)}
      {false && renderApproveAmount( // hidden for now
        symbol,
        campaignTokenStandard,
        claimPattern,
        totalAmount
      )}

      <AsideDivider />
      {renderTotal(totalComission, nativeTokenSymbol)}

    </AsideContent>
    {approvedNote()}
  </>
}

export default AsideContents

