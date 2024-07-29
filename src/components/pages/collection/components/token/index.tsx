import { FC, useState } from 'react'
import { TCollectionToken } from 'types'
import {
  TokenImage,
  Container,
  TokenData,
  TokenVideo,
  TokenContent,
  TokenControls,
  TokenHeader,
  TokenAmount,
  TokenTitle,
  TokenHeaderContent,
  TokenProperties,
  TokenProperty,
  TokenPropertyTitle,
  TokenPropertyValue,
  ButtonStyled,
  TokenDescriptionTitle,
  TokenDescriptionText
} from './styled-components'
import { useHistory } from 'react-router-dom'
import { IAppDispatch } from 'data/store'
import CollectionPlaceholder from 'images/collection-placeholder.png'
import * as asyncCollectionsActions from 'data/store/reducers/collections/async-actions'
import { connect } from 'react-redux'
import { TProps } from './types'
import LinksAmountPopup from '../links-amount-popup'

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    createClaimLinks: (
      collection_id: string,
      token_id: string,
      links_amount: string,
      callback: (location: string) => void
    ) => {
      return dispatch(asyncCollectionsActions.createClaimLinks(
        collection_id,
        token_id,
        links_amount,
        'ERC1155',
        callback
      ))
    }
  }
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapDispatcherToProps> & TCollectionToken & TProps

export const Token: FC<ReduxType> = ({
  name,
  description,
  copies,
  properties,
  token_id,
  thumbnail,
  collectionId,
  createClaimLinks
}) => {
  const history = useHistory()
  const [ showPopup, setShowPopup ] = useState<boolean>(false)

  const renderThumbnail = () => {
    if (!thumbnail) {
      return <TokenImage
        src={CollectionPlaceholder}

        // @ts-ignore
        alt={name}
      />
    }
    if (thumbnail.includes('video')) {
      return <TokenVideo autoPlay loop muted key={thumbnail}>
        <source src={thumbnail} />
        Your browser does not support the video tag.
      </TokenVideo>
    }
    return <TokenImage
      src={thumbnail}
      alt={name}
    />
  }

  return <Container>
    {showPopup && <LinksAmountPopup
      onClose={() => setShowPopup(false)}
      onSubmit={(links_amount) => {
        createClaimLinks(
          collectionId,
          token_id,
          links_amount,
          (location: string) => history.push(location)
        )
      }}
      initialValue={copies === '0' ? '1' : copies}
      limit={copies === '0' ? undefined : copies}
    />}
    <TokenHeader>
      {renderThumbnail()}
      <TokenHeaderContent>
        <TokenTitle>{name}</TokenTitle>
        <TokenAmount>{copies} NFT</TokenAmount>
      </TokenHeaderContent>
    </TokenHeader>
    <TokenContent>
      <TokenData>
        {description && <>
          <TokenDescriptionTitle>Description</TokenDescriptionTitle>
          <TokenDescriptionText>{description}</TokenDescriptionText>
        </>}

        {properties && Object.entries(properties).length > 0 && <TokenProperties>
          {Object.entries(properties).map(([title, value]) => {
            return <TokenProperty>
              <TokenPropertyTitle>{title}</TokenPropertyTitle>
              <TokenPropertyValue>{value}</TokenPropertyValue>
            </TokenProperty>
          })}
        </TokenProperties>}
      </TokenData>
    </TokenContent>
    <TokenControls>
      <ButtonStyled
        appearance='action'
        onClick={() => {
          setShowPopup(true)
        }}
      >
        Create claim Links
      </ButtonStyled>
    </TokenControls>
  </Container>  
}

export default connect(null, mapDispatcherToProps)(Token)
