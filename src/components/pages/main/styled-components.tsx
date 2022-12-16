import styled from 'styled-components'
import { Widget, Button } from 'components/common'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 400px 400px;
  grid-gap: 30px;
`

export const IconContainer = styled.div`
  margin-bottom: 30px;
`

export const Contents = styled.div`
`

export const InvertedWidget = styled(Widget)`
  background-color: ${props => props.theme.blankColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
`

export const WidgetDescription = styled.p`
  font-size: 16px;
  margin: 0 0 30px;
`

export const WidgetButton = styled(Button)`
  padding: 4px 50px;
  width: 100%;
`

export const AlignBottomButton = styled(WidgetButton)`
  align-self: flex-end;
  margin-top: auto;
`

export const Title = styled.h3`
  font-size: 24px;
  margin: 0 0 24px;
  font-size: 600;
  line-height: 32px;

  
`

export const ContainerCentered = styled.div`
  display: flex;
  max-width: 358px;
  align-items: center;
  justify-content: center;
  border-radius: 28px;
  padding: 24px;
  margin: 0 auto;
  width: 100%;
  flex-direction: column;
  background: ${props => props.theme.backgroundColor};

`

export const ConnectWalletContainer = styled.div`
  
`