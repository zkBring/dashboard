import { TProps } from './types'
import { FC } from 'react'
import {
  AsideDivider,
  TableRow,
  TableText,
  TableValue
} from '../index'
import { TLinkContent, TTokenType } from 'types'
import { shortenString, downloadAssetsAsCSV } from 'helpers'
import { Link } from './styled-components'

const AssetsList: FC<TProps> = ({
  data,
  type,
  claimPattern
}) => {
  if (!data || data.length === 0) {
    return <AsideDivider />
  }

  const createItemValue = (item: TLinkContent, type: TTokenType) => {
    switch (type) {
      case 'ERC20':
        return <>
          <TableText>
            Amount/links
          </TableText>
          <TableValue>
            {item.tokenAmount} per link / {item.linksAmount} link(s)
          </TableValue>
        </>
      case 'ERC721':
        return <>
          <TableText>
            {claimPattern === 'mint' ? 'Tokens limit' : 'ID'}
          </TableText>
          <TableValue>
            {shortenString(item.tokenId)}
          </TableValue>
        </>
      case 'ERC1155':
        return <>
          <TableText>
            ID/Copies
          </TableText>
          <TableValue>
            {shortenString(item.tokenId)} / {item.tokenAmount} per link / {item.linksAmount} link(s)
          </TableValue>
        </>
    }
  }
  return <>
    <AsideDivider />
    {data.slice(0, 4).map(item => {
      return <TableRow>
        {createItemValue(item, type)}
      </TableRow>
    })}
    {data.length > 4 && <TableRow>
      <TableText>
        Only 4 IDs are displayed. <Link onClick={() => {
          downloadAssetsAsCSV(
            data,
            'assets'
          )
        }}>Download</Link> csv to see all IDs
      </TableText>
    </TableRow>}
    <AsideDivider />
  </>
}

export default AssetsList