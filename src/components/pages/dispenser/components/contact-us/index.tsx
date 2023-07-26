import { FC } from 'react'
import {
  Container,
  Title,
  Text,
  ButtonsContainer,
  ButtonStyled
} from './styled-components'
import { plausibleApi } from 'data/api'
import { TProps } from './types'
import { defineNetworkName } from 'helpers'

const ContactUs: FC<TProps> = ({
  chainId
}) => {
  return <Container>
    <Title>Got questions?</Title>
    <Text>If you are facing troubles with dispenser app, read documentation or contacts us and we help resolve your issue</Text>
    <ButtonsContainer>
      <ButtonStyled
        onClick={() => {
          plausibleApi.invokeEvent({
            eventName: 'contact',
            data: {
              network: defineNetworkName(chainId),
              component: 'dispenser'
            }
          })
          window.open('https://linkdrop.io/contact-us', '_blank')
        }}
      >
        Contact us
      </ButtonStyled>
      <ButtonStyled
        onClick={() => {
          plausibleApi.invokeEvent({
            eventName: 'view_docs',
            data: {
              network: defineNetworkName(chainId),
              component: 'dispenser'
            }
          })
          window.open('https://docs.linkdrop.io/how-tos/multi-scannable-qr-code', '_blank')
        }}
      >Read FAQ</ButtonStyled>
    </ButtonsContainer>
  </Container>
}

export default ContactUs