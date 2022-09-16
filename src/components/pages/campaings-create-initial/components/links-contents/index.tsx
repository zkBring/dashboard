import { FC } from 'react'
import { TProps } from './types'
import {
  LinkContentsItem,
  LinkContentsData,
  LinkContentsControls
} from './styled-components'
import { TLinkContent } from '../../types'

const ERC1155Content: FC<TLinkContent> = ({
  tokenAmount,
  tokenId,
  linksAmount
}) => {
  return <LinkContentsItem>
    <LinkContentsData>{tokenId}</LinkContentsData>
    <LinkContentsControls></LinkContentsControls>
  </LinkContentsItem>
} 

const LinksContents: FC<TProps> = ({
  data, type
}) => {
  return <>{data.map(item => <ERC1155Content {...item} />)}</>
}

export default LinksContents