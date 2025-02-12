import styled from 'styled-components'
import {
  Input,
  Select
} from 'components/common'
import { WidgetComponent } from 'components/pages/common'

export const InputStyled = styled(Input)``

export const SelectStyled = styled(Select)`
  margin-bottom: 4px;
`


export const SplitInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
`

export const TokenBalance = styled.div`
  font-size: 14px;
  margin-bottom: 30px;
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