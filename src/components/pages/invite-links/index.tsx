import { FC } from 'react'
import {
  WidgetStyled,
  Container,
  ButtonsContainer,
  ButtonStyled
} from './styled-components'
import { defineNetworkName } from 'helpers'
import { plausibleApi } from 'data/api'
import { RootState } from 'data/store'
import { connect } from 'react-redux'

const mapStateToProps = ({
  user: { chainId },
}: RootState) => ({
  chainId
})

type ReduxType = ReturnType<typeof mapStateToProps>

const InviteLinks: FC<ReduxType> = ({
  chainId
}) => {
  return <Container>
    <WidgetStyled title='Let your users share invite links to claim NFT'>
      New product in closed beta, contact us to help you run your first invite links campaign
      <ButtonsContainer>
        <ButtonStyled
          onClick={() => {
            plausibleApi.invokeEvent({
              eventName: 'learn_more',
              data: {
                network: defineNetworkName(chainId),
                component: 'invite_links'
              }
            })
            window.open('https://www.linkdrop.io/invite-links', '_blank')
          }}
        >
          Learn more
        </ButtonStyled>
      
        <ButtonStyled
          appearance='action'
          onClick={() => {
            plausibleApi.invokeEvent({
              eventName: 'contact',
              data: {
                network: defineNetworkName(chainId),
                component: 'invite_links'
              }
            })
            window.open('https://linkdrop.io/contact-us', '_blank')
          }}
        > 
          Contact us
        </ButtonStyled>
      </ButtonsContainer>
    </WidgetStyled>
  </Container>
}

export default connect(mapStateToProps)(InviteLinks)