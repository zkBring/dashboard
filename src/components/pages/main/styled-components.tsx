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

export const Title = styled.h3`
  
`

export const ContainerCentered = styled.div`
  display: flex;
  min-height: 500px;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`

export const ConnectWalletContainer = styled.div`
  
`