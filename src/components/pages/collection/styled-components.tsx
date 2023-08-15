import styled from 'styled-components'
import {
  Aside,
  TableValue,
  WidgetComponent
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
  flex: 1 0 50%; 
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
  max-width: 652px;
  padding: 0;
  margin: 0 0 32px;
  list-style: none;
  border-bottom: 1px solid ${props => props.theme.additionalBorderColor};
`

export const TokenItem = styled.li`
  margin-bottom: 32px;
`

export const CopyIcon = styled.span`
  cursor: pointer;
`