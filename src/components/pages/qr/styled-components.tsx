import { Button, Input, ProgressBar } from "components/common"
import styled from "styled-components"
import {
  WidgetSubtitle
} from 'components/pages/common'
import { Select } from 'components/common'

export const WidgetInfo = styled.div`
  display: grid;
  max-width: 600px;
  grid-template-columns: 1fr auto;
  grid-gap: 10px;
  align-items: center;
  margin-bottom: 26px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const WidgetValue = styled.div`
  font-weight: 700;
  font-size: 32px;
`

export const Buttons = styled.div`
  display: flex;
  justify-content: end;

  & > button {
    margin-left: 16px;
  }
`

export const WidgetButton = styled(Button)`

`

export const InputComponent = styled(Input)`
  margin-bottom: 10px;
`

export const PopupFormContent = styled.div`
  margin-bottom: 20px;
`

export const PopupForm = styled.form`
`

export const LinksIndicator = styled.div`
`

export const WidgetSubtitleStyled = styled(WidgetSubtitle)`
  color: ${props => props.theme.primaryTextColor};
  margin-bottom: 12px;
`

export const StyledProgressBar = styled(ProgressBar)`
  min-width: 100%;
  margin-bottom: 20px;
`

export const StyledSelect = styled(Select)`
  margin-bottom: 24px;
`