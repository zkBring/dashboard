import styled from 'styled-components'
import { Input, Radio, Select, Checkbox, Toggle, DatePicker } from 'linkdrop-ui'
import { WidgetTitle } from 'components/pages/common'

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

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

`

export const WidgetTitleStyled = styled(WidgetTitle)`
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`

export const ToggleStyled = styled(Toggle)`

`

export const DatePickerStyled = styled(DatePicker)`
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