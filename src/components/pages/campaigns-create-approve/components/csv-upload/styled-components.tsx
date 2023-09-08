import styled from 'styled-components'
import { Input, Popup } from "linkdrop-ui"
import { Button } from 'components/common'

export const PopupFormContent = styled.div`
  margin-bottom: 20px;
  padding-top: 20px;
`

export const PopupTitle = styled.h3`
  font-weight: 600;
  margin: 0 0 24px;
  text-align: center;
  padding: 0 40px;
`

export const PopupText = styled.p`
  font-weight: 500;
  margin: 0 0 20px;
  text-align: center;
  padding: 0;
`


export const PopupForm = styled.form`
  position: relative;
`

export const WidgetButton = styled(Button)`
  position: relative;
  cursor: pointer;
`

export const IconContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-90deg);
`

export const InputComponent = styled(Input)`
  margin-bottom: 10px;
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
`

export const Buttons = styled.div`
  display: flex;
  justify-content: end;

  & > button {
    margin-left: 16px;
  }
`

export const PopupStyled = styled(Popup)`
  max-width: 312px;
`