import styled from 'styled-components'
import { Widget, Button } from 'components/common'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 80px;
`


export const WidgetStyled = styled(Widget)`
  width: 550px;
`

export const ButtonsContainer = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: flex-end;
`

export const ButtonStyled = styled(Button)`
  margin-left: 10px;
`