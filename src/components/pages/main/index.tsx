import { FC, useEffect } from 'react'
import {
  WidgetButton,
  ContainerCentered,
  Title,
  IconContainer,
  Contents,
  Text,
  List,
  ListItem
} from './styled-components'
import {
  CheckListItem,
  TextLink
} from 'components/common' 
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import * as asyncUserActions from 'data/store/reducers/user/async-actions'
import { UserActions } from 'data/store/reducers/user/types'
import { Redirect } from 'react-router-dom'
import Icons from 'icons'
import { TAuthorizationStep } from 'types'
import { IAppDispatch } from 'data/store'
import { defineNetworkName, defineSystem } from 'helpers'

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
      return 'Connect'
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

  const system = defineSystem()

  if (system !== 'desktop') {
    return <ContainerCentered>
    <IconContainer>
      <Icons.MonitorIcon />
    </IconContainer>
    
    <Title>
      Please, use desktop browser
    </Title>
    <Contents>

      <Text>
      Linkdrop dashboard is only available on desktop browsers
      </Text>
    </Contents>
  </ContainerCentered>
  }

  if (address && chainId && authorizationStep === 'authorized') {
    return <Redirect to='/campaigns' />
  }

  if (!window.ethereum || !window.ethereum._state) {
    return <ContainerCentered>
      <IconContainer>
        <Icons.AttentionIcon />
      </IconContainer>
      
      <Title>
        Extension required
      </Title>
      <Contents>

        <Text>
          A browser web3 wallet is required to use the Dashboard
        </Text>

        <List>
          <ListItem>Download <TextLink href='https://metamask.io/download/' target='_blank'>Metamask</TextLink></ListItem>
          <ListItem>Return back to this page and click reload</ListItem>
        </List>
        
      </Contents>
      <WidgetButton
        appearance='action'
        onClick={() => {
          window.location.reload()
        }}
        title='Reload page'
      />
    </ContainerCentered>
  }

  if (authorizationStep === 'wrong_network') {
    // return <ContainerCentered>
    //   <IconContainer>
    //     <Icons.AttentionIcon />
    //   </IconContainer>
      
    //   <Title>
    //     Wrong network
    //   </Title>
    //   <Contents>

    //     <Text>
    //       You have {defineNetworkName(chainId)} connected. Please switch the network to {chainId === 1 || chainId === 137 ? 'Goerli/Mumbai' : 'Mainnet/Polygon'} if you intend to use {chainId === 1 || chainId === 137 ? 'Testnets' : 'Mainnet'} Dashboard
    //     </Text>

    //   </Contents>
    //   <WidgetButton
    //     appearance='action'
    //     href={chainId === 1 || chainId === 137 ? 'https://testnets.dashboard.linkdrop.io' : 'https://beta.dashboard.linkdrop.io'}
    //     title={chainId === 1 || chainId === 137 ? 'Go to Testnets Dashboard' : 'Go to Testnets Dashboard'}
    //   />
    // </ContainerCentered>
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
        if (authorizationStep === 'connect') { return connectWallet(chainsAvailable) }
        return authorize(address)
      }}
      title={defineButtonTitle(authorizationStep, loading)}
    />
  </ContainerCentered>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Main)
