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
  defineNetworkName
} from 'helpers'
import { TAssetsData, TTokenType } from 'types'
import { MathType } from 'mathjs'
import { TLinksContent } from '../../types'
import { TClaimPattern } from 'linkdrop-sdk-test/types'


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

const renderNote = (
  sponsored: boolean
) => {
  if (!sponsored) {
    return null
  }
  return <NoteStyled>Please pay attention at the amount that will be secured on the next step before proceeding!</NoteStyled>
}

const renderSecureAmount = (
  sponsored: boolean,
  totalComission: MathType
) => {
  if (!sponsored) {
    return null
  }
  return <>
    <AsideDivider />
    <TableRow>
      <TableText>Secured on next step</TableText>
      <TableValue>{String(totalComission)}</TableValue>
    </TableRow>
  </>
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
  totalComission
}) => {
  const scannerUrl = defineEtherscanUrl(campaignChainId, `/address/${tokenAddress || ''}`)

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

      {renderSecureAmount(sponsored, totalComission)}
      {renderNote(sponsored)}
    </AsideContent>
    {approvedNote()}
  </>
}

export default AsideContents

