import styled from 'styled-components'
import { Widget, Button } from 'components/common'
import { Input, Radio, Toggle } from 'linkdrop-ui'
import {
  WidgetSubtitle,
  InputTitle
} from 'components/pages/common'

export const WidgetStyled = styled(Widget)`
  max-width: 740px;
`

export const InputStyled = styled(Input)`
  margin-bottom: 24px;
`

export const WidgetSubtitleStyled = styled(WidgetSubtitle)`
  margin-bottom: 32px;
`

export const StyledRadio = styled(Radio)`
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;

  & > div {
    flex: 1;
    padding-right: 70px;
  }
`

export const InputTitleWithToggle = styled(InputTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ToggleStyled = styled(Toggle)`

`

export const ButtonStyled = styled(Button)`
  margin-left: 12px;
`