import styled from 'styled-components'
import { Widget } from 'components/common'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 400px 400px;
  grid-gap: 30px;
`

export const InvertedWidget = styled(Widget)`
  background-color: ${props => props.theme.blankColor};
`

