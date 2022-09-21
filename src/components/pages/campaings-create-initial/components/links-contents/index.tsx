import { FC } from 'react'
import { TProps } from './types'
import {
  LinkContentsItem,
  LinkContentsData,
  LinkContentsControls,
  LinksContentDataItem,
  LinksContentDataLabel,
  LinksContentDataValue
} from './styled-components'
import { TLinkContent } from '../../types'
import { TOnRemove } from './types'
import {
  ButtonStyled
} from '../../styled-components'

const ERC1155Content: FC<TLinkContent & { onRemove: TOnRemove }> = ({
  tokenAmount,
  tokenId,
  linksAmount,
  id,
  onRemove
}) => {
  return <LinkContentsItem>
    <LinkContentsData>
      <LinksContentDataItem>
        <LinksContentDataLabel>
          ID
        </LinksContentDataLabel>
        <LinksContentDataValue>
          {tokenId}
        </LinksContentDataValue>
      </LinksContentDataItem>
      <LinksContentDataItem>
        <LinksContentDataLabel>
          Copies
        </LinksContentDataLabel>
        <LinksContentDataValue>
          {tokenAmount}
        </LinksContentDataValue>
      </LinksContentDataItem>
      <LinksContentDataItem>
        <LinksContentDataLabel>
          Number of links
        </LinksContentDataLabel>
        <LinksContentDataValue>
          {linksAmount}
        </LinksContentDataValue>
      </LinksContentDataItem>
    </LinkContentsData>

    <LinkContentsControls>
    <ButtonStyled
        size='small'
        appearance='additional'
        onClick={() => {
          onRemove(id)
        }}
      >
        Remove
      </ButtonStyled>
    </LinkContentsControls>
  </LinkContentsItem>
} 

const LinksContents: FC<TProps> = ({
  data,
  type,
  onRemove
}) => {
  return <>{data.map(item => <ERC1155Content {...item} onRemove={onRemove} />)}</>
}

export default LinksContents