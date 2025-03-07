import styled from 'styled-components'
import {
  Input,
  Select,
  Switcher
} from 'components/common'
import {
  WidgetComponent
} from 'components/pages/common'

export const InputStyled = styled(Input)`
  margin-bottom: 30px;
`

export const SelectStyled = styled(Select)`
  margin-bottom: 30px;
`

export const Subtitle = styled.h4`
  font-weight: 400;
  margin: 0 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SplitInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
`

export const TokenBalance = styled.div`
  font-size: 15px;
  color: ${props => props.theme.secondaryTextColor};
`

export const TokenBalanceValue = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100px;
  display: inline-block;
  vertical-align: bottom;
`

export const AudienceStyled = styled.div`
  margin-bottom: 40px;
`

export const WidgetComponentStyled = styled(WidgetComponent)`
  
`

export const SwitcherStyled = styled(Switcher)`
  margin-bottom: 35px;
`