import { FC, useState } from 'react'
import { TCollectionToken } from 'types'
import {
  TokenImage,
  Container,
  TokenData,
  TokenDataItem,
  TokenDataItemProperties,
  TokenDataLabel,
  TokenDataValue,
  TokenDataProperties,
  TokenDataProperty,
  TokenVideo,
  Content,
  TokenControls
} from './styled-components'
import { useHistory } from 'react-router-dom'
import { IAppDispatch } from 'data/store'
import { Button } from 'components/common'
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
    <Content>
    {renderThumbnail()}
    <TokenData>
      <TokenDataItem>
        <TokenDataLabel>Copies: </TokenDataLabel>
        <TokenDataValue>{copies}</TokenDataValue>
      </TokenDataItem>
      <TokenDataItem>
        <TokenDataLabel>ID: </TokenDataLabel>
        <TokenDataValue>{token_id}</TokenDataValue>
      </TokenDataItem>
      <TokenDataItem>
        <TokenDataLabel>Name: </TokenDataLabel>
        <TokenDataValue>{name}</TokenDataValue>
      </TokenDataItem>
      <TokenDataItem>
        <TokenDataLabel>Description: </TokenDataLabel>
        <TokenDataValue>{description}</TokenDataValue>
      </TokenDataItem>
      {properties && Object.entries(properties).length > 0 && <TokenDataItemProperties>
        <TokenDataLabel>Properties: </TokenDataLabel>
        <TokenDataValue>
          <TokenDataProperties>
            {Object.entries(properties).map(([title, value]) => {
              return <TokenDataProperty>
                {title}: {value}
              </TokenDataProperty>
            })}
          </TokenDataProperties>
          
        </TokenDataValue>
      </TokenDataItemProperties>}
    </TokenData>
    </Content>
    <TokenControls>
      <Button
        appearance='action'
        onClick={() => {
          setShowPopup(true)
        }}
      >
        Create Claim Links
      </Button>
    </TokenControls>
  </Container>  
}

export default connect(null, mapDispatcherToProps)(Token)
