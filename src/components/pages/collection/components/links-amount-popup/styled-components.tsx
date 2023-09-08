import styled from 'styled-components'
import { Button } from 'components/common'
import { Input } from 'linkdrop-ui'

export const InputComponent = styled(Input)`
  margin-bottom: 10px;
`

export const PopupFormContent = styled.div`
  margin-bottom: 20px;
  padding-top: 20px;
`

export const PopupForm = styled.form`
`

export const Buttons = styled.div`
  display: flex;
  justify-content: end;

  & > button {
    margin-left: 16px;

    &:first-child {
      margin-left: 0px;
    }
  }
`

export const WidgetButton = styled(Button)`
  flex: 1;
`

export const PopupText = styled.h3`
  margin: 0 0 32px;
  color: ${props => props.theme.additionalTextColor};
  font-size: 16px;
  font-weight: 400;
`