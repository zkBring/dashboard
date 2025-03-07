import styled from 'styled-components'
import {
  Widget,
  Button,
  Text
} from 'components/common'
import { Note } from 'linkdrop-ui'
import {
  WidgetTitle,
  AsideWidget,
  TableValue
} from 'components/pages/common'

export const WidgetTitleStyled = styled(WidgetTitle)`
  font-size: 15px;
  line-height: 26px;
  margin: 0 0 10px;
  font-weight: 400;
  color: ${props => props.theme.primaryTextColor};
  
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

export const WidgetComponent = styled(Widget)`
  width: 100%;
  padding: 24px;
  position: relative;
  margin-bottom: 20px;
`

export const WidgetButton = styled(Button)``

export const AsideButton = styled(Button)`
  margin-bottom: 12px;
  width: 100%;
  &:last-child {
    margin-bottom: 0px;
  }

  svg {
    margin-right: 4px;
  }
`

export const AsideButtonsContainer = styled.div`
  margin-top: 20px;
`

export const SecondaryTextSpan = styled.span`
  color: ${props => props.theme.additionalTextColor};
`

export const AsideWidgetStyled = styled(AsideWidget)`
  margin: 0;
  background: ${props => props.theme.widgetColor};
  padding: 20px;
  margin-bottom: 20px;
`

export const MainContent = styled.div`
  min-width: 370px;
  flex: 0 1 370px;
  margin: 0;
`


export const NoteStyled = styled(Note)`
  margin-bottom: 32px;
`

export const TableValueStyled = styled(TableValue)`
  display: inline-block;
  padding: 4px 8px;
  line-height: 1;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.tagAdditionalBorderColor};
  background: ${props => props.theme.tagAdditionalBackgroundColor};
  color: ${props => props.theme.primaryTextColor};
`

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;

  display: grid;
  gap: 40px;
  grid-template-columns: 1fr 300px;
  align-items: start;
`


export const TextStyled = styled(Text)`
  margin-bottom: 20px;
`