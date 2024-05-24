import styled from 'styled-components'
import {
  Radio,
  Input,
  Select
} from 'linkdrop-ui'
import { Button } from 'components/common'

import {
  InstructionNote,
  WidgetTitle
} from 'components/pages/common'


export const StyledRadio = styled(Radio)`
  margin-bottom: 20px;
`


export const InputStyled = styled(Input)`
  flex: 1 0;
  margin: 0 16px 0 0;
  margin-bottom: 0px;
`

export const ButtonStyled = styled(Button)``

export const ButtonHeaderStyled = styled(Button)`
  margin-right: 12px;

  &:last-child {
    margin-right: 0;
  }
`

export const NotesContainer = styled.div`
  
`

export const InstructionNoteStyled = styled(InstructionNote)`
  margin-bottom: 20px;
`

export const TextBold = styled.span`
  font-weight: 600;
`

export const InputsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

export const Form = styled.form`

`


export const SelectStyled = styled(Select)`
  width: 100%;
`

export const Container = styled.div``

export const WidgetTitleStyled = styled(WidgetTitle)`
  margin: 0;
  user-select: none;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  align-items: center;
`

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
`
