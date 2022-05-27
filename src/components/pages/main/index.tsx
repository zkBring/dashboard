import { FC } from 'react'
import { Widget, Button } from 'components/common'
import {
  Container,
  InvertedWidget,
  WidgetDescription,
  WidgetButton,
  ContainerCentered,
  Title
} from './styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import * as asyncUserActions from 'data/store/reducers/user/async-actions'
import { UserActions } from 'data/store/reducers/user/types'

const mapStateToProps = ({
  campaigns: { campaigns },
  user: { address, chainId },
}: RootState) => ({
  campaigns,
  address,
  chainId
})

const mapDispatcherToProps = (dispatch: Dispatch<UserActions>) => {
  return {
    connectWallet: () => asyncUserActions.connectWallet(dispatch)
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const Main: FC<ReduxType> = ({
  chainId,
  address,
  connectWallet
}) => {
  if (!chainId || !address) {
    return <ContainerCentered>
      <Title>
        Sign in with your wallet
      </Title>
      <WidgetButton
        appearance='action'
        onClick={connectWallet}
        title='Connect'
      />
    </ContainerCentered>
  }
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
      <WidgetButton
        title='Create'
        appearance='action'
        to='/campaigns/new/erc1155/initial'
      />
    </Widget>
    <InvertedWidget title='Need other features?'>

    </InvertedWidget>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Main)
