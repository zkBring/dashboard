import { FC } from 'react'
import { Container, StyledWidget, WidgetDescription, WidgetButton } from './styled-components'
import { plausibleApi } from 'data/api'

const CollectionsCreateNew: FC = () => {
  return <Container>
    <StyledWidget title='ERC-1155'>
      <WidgetDescription>
        Multiple copies of token with a common image. The most versatile selection for most marketing goals.
      </WidgetDescription>
      <WidgetButton 
        title='Select'
        appearance='action'
        to='/collections/new/ERC1155/initial'
      />
    </StyledWidget>
    <StyledWidget title='ERC-721'>
      <WidgetDescription>
        Unique tokens with individual images. Currently available manually by request
      </WidgetDescription>
      <WidgetButton 
        title='Contact us'
        onClick={() => {
          plausibleApi.invokeEvent({
            eventName: 'contact',
            data: {
              component: 'minter_create_erc721'
            }
          })
          window.open('https://linkdrop.io/contact-us', '_blank')
        }}
      />
    </StyledWidget>  
    <StyledWidget title='ERC-20'>
      <WidgetDescription>
        Assets with no media, consider USDC as an example. Currently available manually by request
      </WidgetDescription>
      <WidgetButton 
        title='Contact us'
        onClick={() => {
          plausibleApi.invokeEvent({
            eventName: 'contact',
            data: {
              component: 'minter_create_erc20'
            }
          })
          window.open('https://linkdrop.io/contact-us', '_blank')
        }}
      />
    </StyledWidget>  
  </Container>  
}

export default CollectionsCreateNew