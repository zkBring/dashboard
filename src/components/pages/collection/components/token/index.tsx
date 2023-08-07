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
  TokenDataProperty
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
  return <Container>
    <TokenImage
      src={thumbnail || CollectionPlaceholder}
      alt='name'
    />

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
      <TokenDataItemProperties>
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
      </TokenDataItemProperties>
    </TokenData>
    
  </Container>
}


export default Token