import styled from 'styled-components'
import { Widget, FileInput, Button } from 'components/common'
import { Input, Radio, Toggle } from 'linkdrop-ui'
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
  object-fit: cover;
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

export const StyledRadio = styled(Radio)`
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;

  & > div {
    flex: 1;
    padding-right: 70px;
  }
`

export const InputTitleWithToggle = styled(InputTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ToggleStyled = styled(Toggle)`

`

export const InputSubtitle = styled.h2`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 12px;
  font-weight: 500;
  color: ${props => props.theme.additionalTextColor};
`


export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
`

export const ButtonStyled = styled(Button)`
  margin-left: 12px;
`