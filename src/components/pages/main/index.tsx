import { FC, useEffect } from 'react'
import {
  WidgetButton,
  ContainerCentered,
  Title,
  IconContainer,
  Contents,
  Text,
  List,
  ListItem,
  TextBold
} from './styled-components'
import {
  CheckListItem,
  TextLink
} from 'components/common' 
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as asyncUserActions from 'data/store/reducers/user/async-actions'
import { UserActions } from 'data/store/reducers/user/types'
import { Redirect } from 'react-router-dom'
import Icons from 'icons'
import { TAuthorizationStep } from 'types'
import { IAppDispatch } from 'data/store'
import { useAccount, useChainId, useConnect } from 'wagmi'

const { REACT_APP_CHAINS, REACT_APP_TESTNETS_URL, REACT_APP_MAINNETS_URL } = process.env

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
    connectWallet: (
      connectorAddress: string,
      connectorChainID: number,
      connector: any,
      chainsAvailable: (number | string)[]
    ) => dispatch(
      asyncUserActions.connectWallet(
        connectorAddress,
        connectorChainID,
        connector,
        chainsAvailable
      )
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
      return 'Loading'
    case 'connect':
      return 'Connect'
    case 'login':
      return 'Sign in'
    case 'store-key':
      return 'Sign'
    default:
      return 'Loading'
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const defineDashboardName = () => {
  if (REACT_APP_CHAINS === '[5,80001]') {
    return 'Testnets Dashboard'
  }
  if (REACT_APP_CHAINS === '[1,137]') {
    return 'Mainnets Dashboard'
  }
  return 'Development Dashboard'
}

const defineSwitchNetworkText = () => {
  if (REACT_APP_CHAINS === '[5,80001]') {
    return <Text>Please switch the network to <TextBold>Goerli</TextBold> or <TextBold>Mumbai</TextBold> to continue</Text>
  }
  if (REACT_APP_CHAINS === '[1,137]') {
    return <Text>Please switch the network to <TextBold>Polygon</TextBold> or <TextBold>Mainnet</TextBold> to continue</Text>
  }
  return <Text>Please switch the network to <TextBold>Polygon</TextBold>, <TextBold>Mainnet</TextBold>, <TextBold>Goerli</TextBold> or <TextBold>Mumbai</TextBold> to continue</Text>  
}

const defineRedirectButton = () => {
  if (!REACT_APP_CHAINS) { return null }
  if (REACT_APP_CHAINS === '[5,80001]') {
    return <WidgetButton appearance='action' href={REACT_APP_MAINNETS_URL}>
      Switch to Main Dashboard
    </WidgetButton>
  }
  if (REACT_APP_CHAINS === '[1,137]') {
    return <WidgetButton appearance='action' href={REACT_APP_TESTNETS_URL}>
      Switch to Testnet Dashboard
    </WidgetButton>
  }
}

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
  const { address: connectorAddress, connector } = useAccount()
  const connectorChainID = useChainId()
  const { connect, connectors } = useConnect()
  const injectedProvider = connectors.find(connector => connector.id === "injected")

  useEffect(() => {
    checkIfConnected()
  }, [])

  useEffect(() => {
    if (!connectorAddress || !connectorChainID || !connector) { return }
    connectWallet(
      connectorAddress,
      connectorChainID,
      connector,
      chainsAvailable
    )
  }, [connectorAddress, connectorChainID, connector])


  if (authorizationStep === 'wrong_device') {
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

  if (authorizationStep === 'no_metamask') {
    return <ContainerCentered>
      <IconContainer>
        <Icons.YellowAttentionIcon />
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
    return <ContainerCentered>
      <IconContainer>
        <Icons.YellowAttentionIcon />
      </IconContainer>
      
      <Title>
        Wrong network
      </Title>
      <Contents>

        <Text>
          You are now on {defineDashboardName()}.
        </Text>
        {defineSwitchNetworkText()}

      </Contents>
      {defineRedirectButton()}
      <WidgetButton
        target='_blank'
        href='https://linkdrop-2.gitbook.io/linkdrop-knoe/'
        title='Read documentation'
      />
    </ContainerCentered>
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
      disabled={loading || !injectedProvider}
      appearance='action'
      onClick={() => {
        if (loading || !injectedProvider) { return }
        if (authorizationStep === 'connect') { 
          return connect({ connector: injectedProvider })
        }
        return authorize(address)
      }}
      title={defineButtonTitle(authorizationStep, loading)}
    />
  </ContainerCentered>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Main)
