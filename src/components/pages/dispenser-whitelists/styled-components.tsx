import styled from "styled-components"
import { Widget, Button } from 'components/common'
import { WidgetTitle, WidgetSubtitle } from 'components/pages/common'

export const Container = styled.div``

export const Options = styled.ul`
  padding: 0;
  max-width: 549px;
  margin: 0;
  list-style: none;
`

export const Option = styled.li`
  padding: 0;
  margin: 0 0 24px;
`

export const WidgetStyled = styled(Widget)`

`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

export const WidgetTitleStyled = styled(WidgetTitle)`
  max-width: 356px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`

export const ButtonStyled = styled(Button)`
`

export const WidgetSubtitleStyled = styled(WidgetSubtitle)`
  max-width: 356px;
`