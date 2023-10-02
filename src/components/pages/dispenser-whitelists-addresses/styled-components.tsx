import styled from "styled-components"
import { Widget, Button } from 'components/common'
import { TextArea } from 'linkdrop-ui'
import { WidgetTitle, WidgetSubtitle } from 'components/pages/common'

export const Container = styled.div`

`


export const WidgetStyled = styled(Widget)`
  max-width: 552px;
`


export const ButtonStyled = styled(Button)`
  width: 100%;
`

export const WidgetSubtitleStyled = styled(WidgetSubtitle)`
  margin-bottom: 32px;
`

export const Buttons = styled.div`
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(2, 1fr);
`

export const TextAreaStyled = styled(TextArea)`
  margin-bottom: 54px;

  textarea {
    min-height: 364px;
  }
`