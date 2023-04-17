import styled from 'styled-components'
import { Input, Popup } from "linkdrop-ui"
import { Button } from 'components/common'

export const PopupStyled = styled(Popup)`
  position: fixed;
  width: 100%;
  
`

export const PopupForm = styled.form`
`

export const WidgetButton = styled(Button)`

`

export const InputComponent = styled(Input)`
  margin-bottom: 10px;
`

export const PopupFormContent = styled.div`
  margin-bottom: 20px;
  padding-top: 20px;
`

export const Buttons = styled.div`
  display: flex;
  justify-content: end;

  & > button {
    margin-left: 16px;
  }
`