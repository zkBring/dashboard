import styled from 'styled-components'
import { ProgressBar } from 'linkdrop-ui'
import {
  Button,
  Widget,
  Stages
} from 'components/common'

export const WidgetStyled = styled(Widget)`
  width: 100%;
  margin: 0 auto;
  max-width: 660px;
  position: relative;
`

export const ButtonStyled = styled(Button)`
  width: 100%;
`

export const StagesStyled = styled(Stages)`
  padding-bottom: 30px;
  margin-bottom: 30px;

  border-bottom: 1px solid ${props => props.theme.primaryBorderColor};
`