import styled from 'styled-components'
import { WidgetTitle } from 'components/pages/common'
export const Container = styled.div``

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

export const WidgetTitleStyled = styled(WidgetTitle)`
  margin: 0;
  user-select: none;
`