import styled from 'styled-components'
import { Widget } from 'components/common'

export const Container = styled.div`
  
`

export const WidgetComponent = styled(Widget)`
  max-width: 1280px;
  width: 100%;
`

export const WidgetContent = styled.div`
  display: flex;
  width: 100%;
`

export const WidgetAside = styled.div`
  flex: 0 450px;
  padding-left: 40px;
`

export const WidgetSummary = styled.div`
  flex: 1;
  padding-right: 40px;
  border-right: 1px solid ${props => props.theme.primaryBorderColor};
`