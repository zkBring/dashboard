import styled from 'styled-components'
import { TProps } from './types'

export const WidgetComponent = styled.div<TProps>`
  background: #FFF;
  width: 100%;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0px 8px 16px rgba(96,97,112,0.16);
`

export const WidgetTitle = styled.h3`
  font-size: 22px;
  margin: 0 0 16px;
  font-weight: 600;
`

export const WidgetContent = styled.div`
  width: 100%;
`

export const WidgetText = styled.p`
  font-size: 16px;
  margin: 0 0 6px;
`

export const WidgetData = styled(WidgetText)`
  font-weight: 600;
`

export const WidgetNote = styled(WidgetText)`
  color: ${props => props.theme.additionalTextColor};
`

export const WidgetTextBlock = styled.div`
  margin-bottom: 20px;
`