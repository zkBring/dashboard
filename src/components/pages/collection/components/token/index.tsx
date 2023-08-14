import { FC } from 'react'
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
  TokenVideo
} from './styled-components'
import CollectionPlaceholder from 'images/collection-placeholder.png'

export const Token: FC<TCollectionToken> = ({
  name,
  description,
  copies,
  properties,
  token_id,
  thumbnail
}) => {

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
    
  </Container>
}


export default Token