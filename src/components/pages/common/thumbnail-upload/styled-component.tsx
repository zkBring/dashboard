import styled from 'styled-components'
import { Widget, FileInput } from 'components/common'


export const WidgetStyled = styled(Widget)`
  max-width: 740px;
`
export const ThumbnailContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  width: 100%;
`

export const Thumbnail = styled.img`
  min-width: 126px;
  max-width: 126px;
  height: 126px;
  margin-right: 24px;
  border-radius: 10px;
  object-fit: cover;
`

export const FileInputStyled = styled(FileInput)`
  flex: 1;
`