import styled from 'styled-components'
import { Widget, Button } from 'components/common'

export const Container = styled.div`
  margin-bottom: 36px;
  background: ${props => props.theme.blankColor};
  display: grid;
  grid-template-columns: repeat(3, 260px);
  grid-gap: 30px;
`

export const Title = styled.h2`
  margin: 0 0 24px;
  font-size: 24px;
`

export const Text = styled.p`
  max-width: 350px;
  margin: 0 0 36px;
  font-size: 16px;
`

export const InvertedWidget = styled(Widget)`
  background-color: ${props => props.theme.blankColor};
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

export const WidgetDescription = styled.p`
  font-size: 16px;
  margin: 0 0 40px;
`

export const WidgetButton = styled(Button)`
  padding: 4px 50px;
`
