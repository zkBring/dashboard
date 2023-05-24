import styled from "styled-components";
import {
  Input,
  DatePicker,
  Select
} from 'linkdrop-ui'
import { Button } from 'components/common'


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 740px;
`

export const ContainerButton = styled(Button)`
  align-self: end;
  margin-right: 20px;

  &:last-child {
    margin-right: 0px;
  }
`

export const InputComponent = styled(Input)`
`

export const Buttons = styled.div`
  display: flex;
  justify-content: end;

  & > button {
    margin-left: 16px;
  }
`

export const DatePickerStyled = styled(DatePicker)`
  margin-bottom: 32px;

  
`

export const SelectStyled = styled(Select)`
  max-width: 100px;
`

export const Note = styled.div`
  padding-top: 42px;
`

export const DateTimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  &> div {
    width: fit-content;
    margin-left: 12px;

    &:first-child {
      flex: 3;
      margin-left: 0px;
    }
  }
`