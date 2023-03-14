import { FC } from 'react'
import {
  LinkContentsItem,
  LinkContentsData,
  LinkContentsControls,
  LinksContentDataItem,
  LinksContentDataLabel,
  LinksContentDataValue,
  CheckIndicator,
  LinksContentImage,
  LinksContentDataValueSpan,
  ButtonStyled
} from './styled-components'
import { TOnRemove, TProps, TOnEdit } from './types'
import { shortenString } from 'helpers'
import { TLinkContent } from 'types'
import Icons from 'icons'
import TokenPlaceholder from 'images/token-placeholder.png'

const SDKContent: FC<TLinkContent & { onRemove: TOnRemove }> = ({
  tokenId,
  id,
  onRemove
}) => {
  return <LinkContentsItem>
    <LinkContentsData>
      <CheckIndicator>
        <Icons.CheckboxIcon />
      </CheckIndicator>
      <LinksContentDataItem>
        <LinksContentDataLabel>
          Number of Tokens
        </LinksContentDataLabel>
        <LinksContentDataValue>
          {shortenString(tokenId)}
        </LinksContentDataValue>
      </LinksContentDataItem>
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

const MintPatternContents: FC<TLinkContent & { onRemove: TOnRemove }> = ({
  tokenId,
  id,
  onRemove
}) => {
  return <LinkContentsItem>
    <LinkContentsData>
      <CheckIndicator>
        <Icons.CheckboxIcon />
      </CheckIndicator>
      <LinksContentDataItem>
        <LinksContentDataLabel>
          Number of NFTs
        </LinksContentDataLabel>
        <LinksContentDataValue>
          {shortenString(tokenId)}
        </LinksContentDataValue>
      </LinksContentDataItem>
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


const ERC721Content: FC<TLinkContent & { onRemove: TOnRemove }> = ({
  tokenId,
  id,
  tokenImage,
  onRemove,
  tokenName
}) => {
  return <LinkContentsItem>
    <LinksContentImage src={tokenImage || TokenPlaceholder} alt={tokenId} />
    <LinkContentsData>
      <LinksContentDataItem>
        <LinksContentDataLabel>
          {tokenName || 'Token'}
        </LinksContentDataLabel>
        <LinksContentDataValue>
         <LinksContentDataValueSpan>ID</LinksContentDataValueSpan>{shortenString(tokenId)}
        </LinksContentDataValue>
      </LinksContentDataItem>
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
        <Icons.TrashIcon />
      </ButtonStyled>
    </LinkContentsControls>
  </LinkContentsItem>
}

const ERC1155Content: FC<TLinkContent & { onRemove: TOnRemove, onEdit?: TOnEdit }> = ({
  tokenId,
  linksAmount,
  id,
  tokenImage,
  tokenName,
  onRemove,
  onEdit
}) => {
  return <LinkContentsItem>
    <LinksContentImage src={tokenImage || TokenPlaceholder} alt={tokenId} />
    <LinkContentsData>
      <LinksContentDataItem>
        <LinksContentDataLabel>
          {tokenName || 'Token'}
        </LinksContentDataLabel>
        <LinksContentDataValue>
          <LinksContentDataValueSpan>ID</LinksContentDataValueSpan>{shortenString(tokenId)}
        </LinksContentDataValue>
      </LinksContentDataItem>

      {/* <LinksContentDataItem>
        <LinksContentDataLabel>
          Amount
        </LinksContentDataLabel>
        <LinksContentDataValue>
          {tokenAmount}
        </LinksContentDataValue>
      </LinksContentDataItem> */}
    </LinkContentsData>

    

    <LinkContentsControls>
      <LinksContentDataItem>
        <LinksContentDataLabel>
          Links
        </LinksContentDataLabel>
        <LinksContentDataValue>
          <LinksContentDataValueSpan>{linksAmount}</LinksContentDataValueSpan>
        </LinksContentDataValue>
      </LinksContentDataItem>
      <ButtonStyled
        size='small'
        appearance='additional'
        onClick={() => {
          if (id === undefined) { return }
          onEdit && onEdit(id)
        }}
      >
        Edit
      </ButtonStyled>
      <ButtonStyled
        size='small'
        appearance='additional'
        onClick={() => {
          if (id === undefined) { return }
          onRemove(id)
        }}
      >
        <Icons.TrashIcon />
      </ButtonStyled>
    </LinkContentsControls>
  </LinkContentsItem>
} 

const ERC20Content: FC<TLinkContent & { onRemove: TOnRemove }> = ({
  tokenAmount,
  linksAmount,
  id,
  onRemove
}) => {
  return <LinkContentsItem>
    <LinkContentsData>
      <CheckIndicator>
        <Icons.CheckboxIcon />
      </CheckIndicator>
      <LinksContentDataItem>
        <LinksContentDataLabel>
          Amount
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
  onRemove,
  onEdit,
  sdk,
  claimPattern
}) => {
  return <>{data.map(item => {
    if (sdk) {
      return <SDKContent {...item} onRemove={onRemove} />
    }

    if (type === 'ERC1155') {
      return <ERC1155Content {...item} onRemove={onRemove} onEdit={onEdit} />
    } else if (type === 'ERC721') {
      if (claimPattern === 'mint') {
        return <MintPatternContents {...item} onRemove={onRemove} />
      }
      return <ERC721Content {...item} onRemove={onRemove} />
    } else {
      return <ERC20Content {...item} onRemove={onRemove} />
    }
  })}
</>
}

export default LinksContents