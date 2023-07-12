import styled from 'styled-components'
import { Input, Radio, Select, Checkbox } from 'linkdrop-ui'

export const StyledRadio = styled(Radio)`
  margin-bottom: 32px
`

export const WidgetSecure = styled.div`
  flex: 1;
  padding-right: 40px;
  border-right: 1px solid ${props => props.theme.primaryBorderColor};
`

export const StyledInput = styled(Input)`
  margin-bottom: 24px;
`

export const StyledSelect = styled(Select)``

export const CheckboxStyled = styled(Checkbox)`
  margin-bottom: 12px;
`

export const CheckboxContainer = styled.div`
  border-bottom: 1px solid ${props => props.theme.primaryBorderColor};
  padding-bottom: 32px;
  margin-bottom: 32px
`