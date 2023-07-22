import { Widget } from "components/common"
import styled from "styled-components"
import { Toggle, Input } from 'linkdrop-ui'
import { WidgetTitle } from 'components/pages/common'

export const WidgetStyled = styled(Widget)`
  
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
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

export const InputStyled = styled(Input)`

`
