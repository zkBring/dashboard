import styled from 'styled-components'
import {
  WidgetComponent,
  WidgetTitle,
  Container
} from 'components/pages/common'
import { Button } from 'components/common'

export const ContainerStyled = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 371px;
  gap: 24px;
`

export const WidgetComponentStyled = styled(WidgetComponent)`
`

export const WidgetAsideStyled = styled(WidgetComponent)`
  max-width: 358px;
`

export const SecondaryTextSpan = styled.span`
  color: ${props => props.theme.additionalTextColor};
`

export const MainContent = styled.div`
`

export const ButtonStyled = styled(Button)`
`

export const TokensList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`

export const TokenItem = styled.li`
  margin-bottom: 32px;
  
  &:last-child {
    margin-bottom: 0;
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
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
