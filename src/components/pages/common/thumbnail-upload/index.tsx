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
  setFile,
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
        onChange={(thumbnail, file) => {
          thumbnail && setThumbnail(thumbnail)
          file && setFile(file)
        }}
      />
    </ThumbnailContainer>
  </InputContainer>
}

export default ThumbnailUpload