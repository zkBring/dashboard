import { FC } from 'react'
import { Container, StyledWidget, WidgetDescription, WidgetButton } from './styled-components'

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
  </Container>  
}

export default CollectionsCreateNew