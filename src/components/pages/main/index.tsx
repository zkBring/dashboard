import { FC } from 'react'
import { Widget } from 'components/common'
import {
  Container,
  InvertedWidget,
  WidgetDescription,
  WidgetButton,
  ContainerCentered,
  Title,
  AlignBottomButton
} from './styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import * as asyncUserActions from 'data/store/reducers/user/async-actions'
import { UserActions } from 'data/store/reducers/user/types'
import { defineNativeTokenSymbol } from 'helpers'

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
  const nativeTokenSymbol = defineNativeTokenSymbol({ chainId: Number(chainId) })
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
        ERC20 + {nativeTokenSymbol}
      </WidgetDescription>
      <WidgetButton
        title='Create'
        appearance='action'
        to='/campaigns/new/erc20/initial'
      />
    </Widget>
    <Widget title='ERC721 Campaign'>
      <WidgetDescription>
        ERC721 + {nativeTokenSymbol}
      </WidgetDescription>
      <WidgetButton
        title='Create'
        appearance='action'
        to='/campaigns/new/erc721/initial'
      />
    </Widget>
    <Widget title='ERC1155 Campaign'>
      <WidgetDescription>
        ERC1155 + {nativeTokenSymbol}
      </WidgetDescription>
      <WidgetButton
        title='Create'
        appearance='action'
        to='/campaigns/new/erc1155/initial'
      />
    </Widget>
    <InvertedWidget title='Need other features?'>
      <WidgetDescription>
        Reach out and let us know what other features you are interested in
      </WidgetDescription>
      <AlignBottomButton
        title='Contact us'
        appearance='action-inverted'
        href='https://linkdrop.io/contact'
      />
      
    </InvertedWidget>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Main)
