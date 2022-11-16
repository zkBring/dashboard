import styled from 'styled-components'
import { Widget, Button } from 'components/common'
import { WidgetTitle } from 'components/pages/common'

export const WidgetTitleStyled = styled(WidgetTitle)`
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

export const WidgetComponent = styled(Widget)`
  max-width: 1280px;
  width: 100%;
  position: relative;
`

export const WidgetButton = styled(Button)`
  
`
