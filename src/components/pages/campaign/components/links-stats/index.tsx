import { FC } from 'react'
import TProps from './types'
import {
  WidgetComponent
} from 'components/pages/common'
import {
  Container,
  Subtitle,
  Value
} from './styled-components'

const LinksStats: FC<TProps> = ({
  linksAmount,
  linksClaimed,
  sponsored
}) => {
  return <Container>
    <WidgetComponent>
      <Subtitle>Links created</Subtitle>
      <Value>{linksAmount || 0}</Value>
    </WidgetComponent>
     <WidgetComponent>
      <Subtitle>Claims</Subtitle>
      <Value>{sponsored ? (linksClaimed|| 0) : 'N/A'}</Value>
    </WidgetComponent>
  </Container>
}
export default LinksStats