import styled from 'styled-components'
import { Radio, Input, Select } from 'linkdrop-ui'
import { Button } from 'components/common'

import {
  InstructionNote
} from 'components/pages/common'


export const StyledRadio = styled(Radio)`
  margin-bottom: 20px;
`

export const InputsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

export const InputStyled = styled(Input)`
  flex: 1 0;
  margin: 0 16px 0 0;
  margin-bottom: 0px;
`

export const ButtonStyled = styled(Button)`
  
`

export const NotesContainer = styled.div`
  
`

export const InstructionNoteStyled = styled(InstructionNote)`
  margin-bottom: 20px;
`

export const TextBold = styled.span`
  font-weight: 600;
`

export const SelectStyled = styled(Select)`
  width: 100%;
`