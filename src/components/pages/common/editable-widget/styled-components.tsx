import styled, { css } from 'styled-components'
import {
  Text,
  Button
} from 'components/common'

export const WidgetTitle = styled.h3`
  font-size: 15px;
  margin: 0 0 10px;
  color: ${props => props.theme.primaryTextColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const AsideWrapper = styled.div`
  border-radius: 10px;
  margin: 0;
  background: ${props => props.theme.widgetColor};
  padding: 20px;
  margin-bottom: 20px;
`

export const TextStyled = styled(Text)`

`

export const EditButton = styled.div`
  cursor: pointer;
`

export const ShowMore = styled.span`
  color: ${props => props.theme.primaryTextColor};
  cursor: pointer;
`