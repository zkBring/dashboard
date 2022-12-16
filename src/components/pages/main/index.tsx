import { FC } from 'react'
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

const mapStateToProps = ({
  campaigns: { campaigns },
  user: { address, chainId, loading, authorizationStep },
}: RootState) => ({
  campaigns,
  address,
  chainId,
  loading,
  authorizationStep
})

const mapDispatcherToProps = (dispatch: Dispatch<UserActions>) => {
  return {
    connectWallet: () => asyncUserActions.connectWallet(dispatch)
  }
}


const defineButtonTitle = (step: TAuthorizationStep, loading: boolean) => {
  if (loading) {
    return 'Loading'
  }
  switch (step) {
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
  loading,
  authorizationStep
}) => {
  if (address && chainId) {
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
      loading={loading}
      appearance='action'
      onClick={connectWallet}
      title={defineButtonTitle(authorizationStep, loading)}
    />
  </ContainerCentered>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Main)
