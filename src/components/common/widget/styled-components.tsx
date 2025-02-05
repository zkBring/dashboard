import styled from 'styled-components'
import { TProps } from './types'

export const WidgetComponent = styled.div<TProps>`
  background-color: ${props => props.theme.widgetColor};
  width: 100%;
  border-radius: 10px;
  padding: 70px 130px;
`

export const WidgetTitle = styled.h3`
  font-size: 50px;
  margin: 0 0 40px;
  font-family: FKRasterRoman, sans-serif;
  font-weight: 400;
`

export const WidgetContent = styled.div`
  width: 100%;
`
