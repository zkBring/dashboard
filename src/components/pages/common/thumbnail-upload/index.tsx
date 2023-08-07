import { FC } from 'react'
import {
  ThumbnailContainer,
  FileInputStyled,
  Thumbnail
} from './styled-component'
import { TProps } from './types'
import CollectionPlaceholder from 'images/collection-placeholder.png'
import {
  InputTitleAdditional,
  InputTitle,
  InputContainer,
  InputSubtitle
} from 'components/pages/common'

const ThumbnailUpload: FC<TProps> = ({
  thumbnail,
  setThumbnail,
  title,
  note,
  subtitle
}) => {
  return <InputContainer>
    <InputTitle>
      {title} <InputTitleAdditional>{note}</InputTitleAdditional>
    </InputTitle>
    {subtitle && <InputSubtitle>
      {subtitle}
    </InputSubtitle>}
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
  </InputContainer>
}

export default ThumbnailUpload