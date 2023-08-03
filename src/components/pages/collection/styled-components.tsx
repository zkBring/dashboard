import styled from 'styled-components'
import {
  Aside,
  TableValue
} from 'components/pages/common'

export const SecondaryTextSpan = styled.span`
  color: ${props => props.theme.additionalTextColor};
`

export const AsideStyled = styled(Aside)`
  max-width: 358px;
  min-width: 358px;
  margin: 0;
`

export const AsideContent = styled.div`
  margin-bottom: 32px;
`

export const MainContent = styled.div`
  margin-right: 24px;
  flex: 1 0 50%; 
`

export const TableValueFlex = styled(TableValue)`
  display: flex;
  align-items: center;

  svg {
    margin-right: 4px;
  }
`