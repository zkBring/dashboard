import { FC } from 'react'
import {
  Container,
  WidgetComponent,
} from './styled-components'
import { Secure } from './components'


const CampaignsCreateSecure: FC = () => {
  return <Container>
    <WidgetComponent title='Linkdrop Contract'>
      <Secure />
    </WidgetComponent>
  </Container>
}

export default CampaignsCreateSecure