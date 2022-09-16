import { FC } from 'react'
import {
  WidgetButton,
  ContainerCentered,
  Title,
} from './styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import * as asyncUserActions from 'data/store/reducers/user/async-actions'
import { UserActions } from 'data/store/reducers/user/types'
import { defineNativeTokenSymbol } from 'helpers'
import { Redirect } from 'react-router-dom'

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
  if (address && chainId) {
    return <Redirect to='/campaigns' />
  }
  return <ContainerCentered>
    <Title>
      Sign in
    </Title>
    <WidgetButton
      appearance='action'
      onClick={connectWallet}
      title='Sign in'
    />
  </ContainerCentered>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Main)
