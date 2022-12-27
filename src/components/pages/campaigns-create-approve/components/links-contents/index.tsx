import { FC } from 'react'
import {
  LinkContentsItem,
  LinkContentsData,
  LinkContentsControls,
  LinksContentDataItem,
  LinksContentDataLabel,
  LinksContentDataValue,
  CheckIndicator
} from './styled-components'
import { TOnRemove, TProps} from './types'
import { shortenString } from 'helpers'
import { TLinkContent } from 'types'
import Icons from 'icons'
import {
  ButtonStyled
} from '../../styled-components'

const ERC1155Content: FC<TLinkContent & { onRemove: TOnRemove }> = ({
  tokenAmount,
  tokenId,
  linksAmount,
  type,
  id,
  onRemove
}) => {
  return <LinkContentsItem>
    <LinkContentsData>
      <CheckIndicator>
        <Icons.CheckboxIcon />
      </CheckIndicator>
      {type !== 'ERC20' && <LinksContentDataItem>
        <LinksContentDataLabel>
          ID
        </LinksContentDataLabel>
        <LinksContentDataValue>
          {shortenString(tokenId)}
        </LinksContentDataValue>
      </LinksContentDataItem>}
      {type !== 'ERC721' && <LinksContentDataItem>
        <LinksContentDataLabel>
          Amount
        </LinksContentDataLabel>
        <LinksContentDataValue>
          {tokenAmount}
        </LinksContentDataValue>
      </LinksContentDataItem>}
      {type !== 'ERC721' && <LinksContentDataItem>
        <LinksContentDataLabel>
          Number of links
        </LinksContentDataLabel>
        <LinksContentDataValue>
          {linksAmount}
        </LinksContentDataValue>
      </LinksContentDataItem>}
    </LinkContentsData>

    <LinkContentsControls>
    <ButtonStyled
        size='small'
        appearance='additional'
        onClick={() => {
          if (id === undefined) { return }
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