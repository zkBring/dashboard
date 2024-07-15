import styled from "styled-components"
import {
  Radio,
  Checkbox,
  Select
} from 'linkdrop-ui'
import { AsidePopup } from 'components/common'

export const RadioStyled = styled(Radio)`
  margin-bottom: 32px
`

export const CheckboxStyled = styled(Checkbox)`
  margin-bottom: 12px;
`

export const CheckboxContainer = styled.div`
  margin-bottom: 36px;
`


export const AsidePopupStyled = styled(AsidePopup)`
  display: grid;
  grid-template-rows: min-content min-content 1fr min-content;
  height: 100vh;
`

export const SelectStyled = styled(Select)`
  
`