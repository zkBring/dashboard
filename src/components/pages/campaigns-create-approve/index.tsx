import { FC } from 'react'
import {
  Container,
  WidgetComponent,
} from './styled-components'
import { Summary } from './components'

const CampaignsCreateApprove: FC = () => {
  return <Container>
    <WidgetComponent title='Approve'>
      <Summary />
    </WidgetComponent>
  </Container>
}

export default CampaignsCreateApprove
