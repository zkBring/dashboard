import { TProps } from './types'
import { FC } from 'react'
import {
  AsideDivider,
  AsideRow,
  AsideText,
  AsideValue
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
          <AsideText>
            Copies/links
          </AsideText>
          <AsideValue>
            {item.tokenAmount} copies / {item.linksAmount} link(s)
          </AsideValue>
        </>
      case 'ERC721':
        return <>
          <AsideText>
            {claimPattern === 'mint' ? 'Tokens limit' : 'ID'}
          </AsideText>
          <AsideValue>
            {shortenString(item.tokenId)}
          </AsideValue>
        </>
      case 'ERC1155':
        return <>
          <AsideText>
            ID/Copies
          </AsideText>
          <AsideValue>
            {shortenString(item.tokenId)} / {item.tokenAmount} copies / {item.linksAmount} link(s)
          </AsideValue>
        </>
    }
  }
  return <>
    <AsideDivider />
    {data.slice(0, 4).map(item => {
      return <AsideRow>
        {createItemValue(item, type)}
      </AsideRow>
    })}
    {data.length > 4 && <AsideRow>
      <AsideText>
        Only 4 IDs are displayed. <Link onClick={() => {
          downloadAssetsAsCSV(
            data,
            'assets'
          )
        }}>Download</Link> csv to see all IDs
      </AsideText>
    </AsideRow>}
    <AsideDivider />
  </>
}

export default AssetsList