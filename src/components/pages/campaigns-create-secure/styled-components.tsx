import styled from 'styled-components'
import { Input, Radio, Select } from 'linkdrop-ui'

export const StyledRadio = styled(Radio)`
  margin-bottom: 20px;
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