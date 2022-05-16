import styled from 'styled-components'
import { TProps } from './types'


export const WidgetComponent = styled.div<TProps>`
  background: #FFF;
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  padding: 40px;
`

export const WidgetTitle = styled.h3`
  font-size: 24px;
  margin: 0 0 20px;
  font-weight: 400;
`

export const WidgetContent = styled.div`
  width: 100%;
`

export const WidgetText = styled.p`
  font-size: 16px;
  margin: 0 0 6px;
`

export const WidgetData = styled(WidgetText)`
  font-weight: 700;
`

export const WidgetNote = styled(WidgetText)`
  color: ${props => props.theme.additionalTextColor};
`

export const WidgetTextBlock = styled.div`
  margin-bottom: 20px;
`