import styled from 'styled-components'
import { Widget } from 'components/common'

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1122px;
`

export const WidgetContainer = styled.div`
  width: 100%;
`

export const WidgetComponent = styled(Widget)`
  width: 100%;
  position: relative;
  padding: 24px;
  margin-bottom: 24px;
`

export const WidgetAside = styled.div`
  flex: 0 450px;
  min-width: 450px;
  padding-left: 24px;
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const WidgetTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 16px;
  color: ${props => props.theme.primaryTextColor};
`

export const WidgetSubtitle = styled.p`
  font-size: 16px;
  margin: 0 0 36px;
  color: ${props => props.theme.additionalTextColor};
`