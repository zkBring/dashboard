import styled from 'styled-components'
import { Widget, Button } from 'components/common'
import { Note } from 'linkdrop-ui'
import { WidgetTitle, Aside } from 'components/pages/common'

export const WidgetTitleStyled = styled(WidgetTitle)`
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

export const WidgetComponent = styled(Widget)`
  max-width: 1280px;
  width: 100%;
  position: relative;
`

export const WidgetButton = styled(Button)``

export const AsideButton = styled(Button)`
  margin-bottom: 12px;
  width: 100%;
  &:last-child {
    margin-bottom: 0px;
  }
`

export const AsideButtonsContainer = styled.div`
  margin-top: 20px;
`

export const SecondaryTextSpan = styled.span`
  color: ${props => props.theme.additionalTextColor};
`

export const AsideStyled = styled(Aside)`
  min-width: 100%!important;
  margin: 0;
`

export const MainContent = styled.div`
  min-width: 370px;
  flex: 0 1 370px;
  margin: 0;
`

export const AsideContainer = styled.div`
  min-width: 370px;
  flex: 0 1 370px;
  padding-left: 24px;
`

export const NoteStyled = styled(Note)`
  margin-bottom: 32px;
`