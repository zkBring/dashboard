import styled from 'styled-components'
import { WidgetTextBlock } from 'components/common'

export const TextBlock = styled(WidgetTextBlock)`
  text-align: center;

  span {
    font-weight: 600;
  }
`

export const WidgetAside = styled.div`
  flex: 0 450px;
  padding-left: 40px;
`