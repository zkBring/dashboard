import styled from 'styled-components'
import { Widget, Button } from 'components/common'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 400px 400px;
  grid-gap: 30px;
`

export const InvertedWidget = styled(Widget)`
  background-color: ${props => props.theme.blankColor};
`

export const WidgetDescription = styled.p`
  font-size: 16px;
  margin: 0 0 10px;
`

export const WidgetButton = styled(Button)`
  padding: 4px 50px;
`