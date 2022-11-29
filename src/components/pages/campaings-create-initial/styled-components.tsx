import styled from 'styled-components'
import { Radio, Input, Button } from 'components/common'
import {
  AsideValue
} from 'components/pages/common'

export const StyledRadio = styled(Radio)`
  margin-bottom: 20px;
`

export const InputsContainer = styled.div`
  display: flex;
  align-items: center;
`

export const InputStyled = styled(Input)`
  flex: 1 0;
  margin: 0 16px 0 0;
`

export const ButtonStyled = styled(Button)`
  
`

export const AsideValueShorten = styled(AsideValue)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 200px;
`