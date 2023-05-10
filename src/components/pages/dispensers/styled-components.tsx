import styled from "styled-components"
import { WidgetTitle } from 'components/pages/common'
import { Button } from 'components/common'

export const Container = styled.div``

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

export const WidgetTitleStyled = styled(WidgetTitle)`
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0;
`

export const ContainerButton = styled(Button)`
  align-self: end;
  margin-bottom: 0px;
`
