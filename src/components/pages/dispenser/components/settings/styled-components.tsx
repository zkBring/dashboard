import { Widget, Button, TextLink } from "components/common"
import { TableValue } from "components/pages/common"
import styled from "styled-components"
import { Note } from 'linkdrop-ui'

export const WidgetLoaderStyled = styled(Widget)`
  margin-bottom: 24px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 120px;
  }
`


export const WidgetStyled = styled(Widget)`
  margin-bottom: 24px;
`

export const TableValueStyled = styled(TableValue)`
  display: flex;
  gap: 14px;
  align-items: center;
  cursor: pointer;
`

export const ButtonStyled = styled(Button)`
  
`

export const NoteStyled = styled(Note)`
  border: none;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.primaryTextColor};
`

export const TextLinkStyled = styled(TextLink)`
`