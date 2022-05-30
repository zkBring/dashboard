import styled from 'styled-components'
import { Widget, Textarea, Button } from 'components/common'

export const Container = styled.div`
`

export const WidgetComponent = styled(Widget)`
  max-width: 1280px;
  width: 100%;
  position: relative;
`

export const WidgetContent = styled.div`
  display: flex;
  width: 100%;
`

export const WidgetOptions = styled.div`
  flex: 1;
  padding-right: 40px;
  border-right: 1px solid ${props => props.theme.primaryBorderColor};
`

export const WidgetAside = styled.div`
  flex: 0 450px;
  padding-left: 40px;
`

export const WidgetTextarea = styled(Textarea)`
  margin-bottom: 30px;
  textarea {
    min-height: 200px;
  }
`

export const WidgetButton = styled(Button)`
  padding: 4px 50px;
`