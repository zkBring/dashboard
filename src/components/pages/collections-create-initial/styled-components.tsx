import styled from 'styled-components'
import { Widget } from 'components/common'
import { FileInput } from 'components/common'
import { Input } from 'linkdrop-ui'
import {
  WidgetSubtitle
} from 'components/pages/common'

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
  width: 126px;
  height: 126px;
  margin-right: 24px;
  border-radius: 10px;
`

export const FileInputStyled = styled(FileInput)`
  flex: 1;
`

export const InputStyled = styled(Input)`
  margin-bottom: 24px;
`

export const InputContainer = styled.div``

export const InputTitle = styled.h3`
  font-size: 16px;
  line-height: 24px;
  margin: 0 0 12px; 
  font-weight: 500;
  color: ${props => props.theme.primaryTextColor};
`

export const InputTitleAdditional = styled.span`
  color: ${props => props.theme.additionalTextColor};
`

export const WidgetSubtitleStyled = styled(WidgetSubtitle)`
  margin-bottom: 32px;
`