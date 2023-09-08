import styled from 'styled-components'
import {
  Aside,
  TableValue,
  WidgetComponent,
  WidgetTitle,
  AttentionContainer
} from 'components/pages/common'
import { Button } from 'components/common'


export const WidgetComponentStyled = styled(WidgetComponent)`
  max-width: 740px;
`

export const WidgetAsideStyled = styled(WidgetComponent)`
  max-width: 358px;
`

export const SecondaryTextSpan = styled.span`
  color: ${props => props.theme.additionalTextColor};
`

export const AsideStyled = styled(Aside)`
  max-width: 358px;
  min-width: 358px;
  margin: 0;
`

export const AsideContent = styled.div`
  margin-bottom: 32px;
`

export const MainContent = styled.div`
  margin-right: 24px;
  flex: 1 0; 
`

export const TableValueFlex = styled(TableValue)`
  display: flex;
  align-items: center;

  svg {
    margin-right: 4px;
  }
`

export const ButtonStyled = styled(Button)`
  
`

export const ButtonFullWidth = styled(Button)`
  width: 100%;
  margin-top: 32px;
`

export const TokensList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`

export const TokenItem = styled.li`
  margin-bottom: 32px;
  
  &:last-child {
    margin-bottom: 0;
  }
`

export const CopyIcon = styled.span`
  cursor: pointer;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`

export const WidgetTitleStyled = styled(WidgetTitle)`
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0;
`

export const ContainerButton = styled(Button)`
  align-self: end;
  margin-bottom: 0px;
`

export const AttentionContainerStyled = styled(AttentionContainer)`
  margin-bottom: 24px;
`