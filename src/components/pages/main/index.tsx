import { FC } from 'react'
import { Widget, Button } from 'components/common'
import { Container, InvertedWidget, WidgetDescription, WidgetButton } from './styled-components'

const Main: FC = () => {
  return <Container>
    <Widget title='ERC20 Campaign'>
      <WidgetDescription>
        List of links with encoded tokens prepared to distribute
      </WidgetDescription>
      <WidgetDescription>
        ERC20 + ETH
      </WidgetDescription>
      <WidgetButton
        title='Create'
        appearance='action'
        to='/campaigns/new/erc20/initial'
      />
    </Widget>
    <Widget title='ERC721 Campaign'>
      <WidgetDescription>
        List of links with encoded tokens prepared to distribute
      </WidgetDescription>
      <WidgetDescription>
        ERC721 + ETH
      </WidgetDescription>
      <WidgetButton
        title='Create'
        appearance='action'
        to='/campaigns/new/erc721/initial'
      />
    </Widget>
    <Widget title='ERC1155 Campaign'>
      <WidgetDescription>
        List of links with encoded tokens prepared to distribute
      </WidgetDescription>
      <WidgetDescription>
        ERC1155 + ETH
      </WidgetDescription>
    </Widget>
    <InvertedWidget title='Need other features?'>

    </InvertedWidget>
  </Container>
}

export default Main
