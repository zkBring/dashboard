import { FC } from 'react'
import { Widget, Button } from 'components/common'
import { Container, InvertedWidget } from './styled-components'

const Main: FC = () => {
  return <Container>
    <Widget title='ERC20 Campaign'>
      <Button
        title='Create'
        appearance='action'
        to='/campaigns/new/erc20/initial'
      />
    </Widget>
    <Widget title='ERC721 Campaign'>
      
    </Widget>
    <Widget title='ERC1155 Campaign'>
      
    </Widget>
    <InvertedWidget title='Need other features?'>

    </InvertedWidget>
  </Container>
}

export default Main
