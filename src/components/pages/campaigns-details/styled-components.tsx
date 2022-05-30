import styled from 'styled-components'
import { Widget, Button } from 'components/common'

export const Container = styled.div`
  
`

export const WidgetComponent = styled(Widget)`
  max-width: 1280px;
  width: 100%;
`

export const WidgetButton = styled(Button)`
  
`

export const BatchList = styled.div`
  display: inline-grid;
  grid-template-columns: auto 200px;
  align-items: center;
  grid-gap: 6px;
  margin-bottom: 20px;
`

export const BatchTitle = styled.div`
  margin-right: 10px;
`