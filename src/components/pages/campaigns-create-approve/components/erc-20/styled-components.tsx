import styled from 'styled-components'
import { WidgetTitle } from 'components/pages/common'

export const Container = styled.div``


export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  align-items: center;
`

export const WidgetTitleStyled = styled(WidgetTitle)`
  margin-bottom: 0px;
`

export const TokenBalance = styled.div`
  font-size: 14px;
`

export const TokenBalanceValue = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100px;
  display: inline-block;
  vertical-align: bottom;
`