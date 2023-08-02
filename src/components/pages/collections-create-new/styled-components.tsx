import styled from "styled-components"
import { Widget, Button } from 'components/common'

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 263px);
  grid-gap: 23px;
`

export const StyledWidget = styled(Widget)`
  max-width: 260px;
  margin-bottom: 56px;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

export const WidgetDescription = styled.p`
  font-size: 12px;
  margin: 0 0 40px;
`

export const WidgetButton = styled(Button)`
  padding: 4px 50px;
  width: 100%;
`