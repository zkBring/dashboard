import { FC, useState } from 'react'
import {
  WidgetStyled,
  ThumbnailContainer,
  Thumbnail,
  FileInputStyled,
  InputStyled,
  InputContainer, 
  InputTitleAdditional,
  InputTitle,
  WidgetSubtitleStyled
} from './styled-components'

import CollectionPlaceholder from 'images/collection-placeholder.png'

const CollectionsCreateInitial: FC = () => {
  const [ thumbnail, setThumbnail ] = useState<string>('')
  const [ title, setTitle ] = useState<string>('')
  const [ symbol, setSymbol ] = useState<string>('')
  return <WidgetStyled title='Collection setup'>
    <WidgetSubtitleStyled>
      Select the way you’d prefer to create and distribute tokens
    </WidgetSubtitleStyled>
    <InputContainer>
      <InputTitle>
        Collection Title <InputTitleAdditional>(max. 200 symbols)</InputTitleAdditional>
      </InputTitle>
      <InputStyled
        value={title}
        onChange={(value) => {
          setTitle(value)
          return value
        }}
      />
    </InputContainer>

    <InputContainer>
      <InputTitle>
        Collection Symbol <InputTitleAdditional>(optional, not more than 5 symbols recommended)</InputTitleAdditional>
      </InputTitle>
      <InputStyled
        value={symbol}
        onChange={(value) => {
          setSymbol(value)
          return value
        }}
        note='If you don’t know what a symbol is, keep it blank, and we will use the auto-generated one based on title'
      />
    </InputContainer>
    
    <ThumbnailContainer>
      <Thumbnail
        src={thumbnail || CollectionPlaceholder}
        alt='image'
      />
      <FileInputStyled
        onChange={(data) => {
          setThumbnail(data)
        }}
      />
    </ThumbnailContainer>
    
  </WidgetStyled>
}

export default CollectionsCreateInitial