import styled from 'styled-components'
import {
  WidgetComponent
} from 'components/pages/common'
import { Button } from 'components/common'
import { Input, Radio, Toggle, TextArea } from 'linkdrop-ui'

export const Container = styled.div``

export const WidgetComponentStyled = styled(WidgetComponent)`
  max-width: 740px;
`

export const InputStyled = styled(Input)`
  margin-bottom: 24px;
`

export const TextAreaStyled = styled(TextArea)`
  margin-bottom: 24px;
`

export const InputsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

export const PropertiesInputStyled = styled(Input)`
  flex: 1 0;
  margin: 0 16px 0 0;
  margin-bottom: 0px;
`

export const ButtonStyled = styled(Button)`
  
`