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
      <Value>{linksAmount}</Value>
    </WidgetComponent>
    {sponsored && <WidgetComponent>
      <Subtitle>Claimed</Subtitle>
      <Value>{linksClaimed}</Value>
    </WidgetComponent>}
  </Container>
}

export default LinksStats