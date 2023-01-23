import { FC, useEffect } from 'react'
import {
  WidgetButton,
  ContainerCentered,
  Title,
  IconContainer,
  Contents,
} from './styled-components'
import {
  CheckListItem
} from 'components/common' 
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import * as asyncUserActions from 'data/store/reducers/user/async-actions'
import { UserActions } from 'data/store/reducers/user/types'
import { Redirect } from 'react-router-dom'
import Icons from 'icons'
import { TAuthorizationStep } from 'types';
import { IAppDispatch } from 'data/store'

const mapStateToProps = ({
  campaigns: { campaigns },
  user: { address, chainId, loading, authorizationStep, chainsAvailable},
}: RootState) => ({
  campaigns,
  address,
  chainId,
  loading,
  authorizationStep,
  chainsAvailable
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<UserActions>) => {
  return {
    connectWallet: (chainsAvailable: (number | string)[]) => asyncUserActions.connectWallet(
      dispatch,
      chainsAvailable
    ),
    authorize: (address: string) => dispatch(asyncUserActions.authorize(address)),
    checkIfConnected: () => dispatch(asyncUserActions.checkIfConnected())
  }
}


const defineButtonTitle = (step: TAuthorizationStep, loading: boolean) => {
  if (loading && step !== 'initial') {
    return 'Loading'
  }
  switch (step) {
    case 'initial':
    case 'connect':
      return 'Connect'
    case 'login':
      return 'Sign in'
    case 'store-key':
      return 'Sign'
    default:
      return ''
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const Main: FC<ReduxType> = ({
  chainId,
  address,
  connectWallet,
  authorize,
  loading,
  authorizationStep,
  checkIfConnected,
  chainsAvailable
}) => {
  useEffect(() => {
    checkIfConnected()
  }, [])
  if (address && chainId && authorizationStep === 'authorized') {
    return <Redirect to='/campaigns' />
  }
  return <ContainerCentered>
    <IconContainer>
      <Icons.SignInIcon />
    </IconContainer>
    
    <Title>
      Welcome to Linkdrop
    </Title>
    <Contents>
      <CheckListItem title='Connect wallet' id='connect' checked={authorizationStep === 'login' || authorizationStep === 'store-key' || authorizationStep === 'authorized'} />
      <CheckListItem title='Sign message to login to the dashboard' id='login' checked={authorizationStep === 'store-key' || authorizationStep === 'authorized'} />
      <CheckListItem title='Sign message to store data securely' id='store-key' checked={authorizationStep === 'authorized'} />
    </Contents>
    <WidgetButton
      loading={loading && authorizationStep !== 'initial'}
      disabled={loading || authorizationStep === 'initial'}
      appearance='action'
      onClick={() => {
        console.log({authorizationStep})
        if (authorizationStep === 'connect') { return connectWallet(chainsAvailable) }
        return authorize(address)
      }}
      title={defineButtonTitle(authorizationStep, loading)}
    />
  </ContainerCentered>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Main)
