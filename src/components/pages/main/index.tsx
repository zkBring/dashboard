import { FC, useEffect } from 'react'
import {
  WidgetButton,
  ContainerCentered,
  Title,
  ImageContainer,
  Contents,
  Text,
  TextBold,
  AdditionalButton
} from './styled-components'
import Image from 'images/connect-image.png'
import {
  CheckListItem
} from 'components/common'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as asyncUserActions from 'data/store/reducers/user/async-actions'
import { UserActions } from 'data/store/reducers/user/types'
import { Redirect } from 'react-router-dom'
import { TAuthorizationStep, TSystem } from 'types'
import { useAccount, useChainId, useConnect } from 'wagmi'
import { useEthersSigner } from 'hooks'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { SiweMessage } from 'siwe'
import { nonceApi, dashboardKeyApi } from 'data/api'
import { defineSystem } from 'helpers'

const {
} = process.env

const mapStateToProps = ({
  campaigns: { campaigns },
  user: {
    address,
    chainId,
    loading,
    authorizationStep,
    chainsAvailable
  },
}: RootState) => ({
  campaigns,
  address,
  chainId,
  loading,
  authorizationStep,
  chainsAvailable
})

const defineTitle = (
  authorizationStep: TAuthorizationStep
) => {
  switch (authorizationStep) {
    case 'connect':
      return 'Connect wallet'
    case 'login':
      return 'Login'
    default:
      return ''
  }
} 

const defineText = (
  authorizationStep: TAuthorizationStep,
) => {
  switch (authorizationStep) {
    case 'connect':
      return 'Enable zkBring to view your address and suggest transactions for approval'
    case 'login':
      return 'Sign a message in your wallet to log in securely to zkBring Dashboard'

    default:
      return ''
  }
} 

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<UserActions>) => {
  return {
    connectWallet: (
      connectorAddress: string,
      connectorChainID: number,
      connector: any,
      signer: any,
      chainsAvailable: (number | string)[]
    ) => dispatch(
      asyncUserActions.connectWallet(
        connectorAddress,
        connectorChainID,
        connector,
        signer,
        chainsAvailable
      )
    ),
    authorize: (
      message: string,
      timestamp: number
    ) => dispatch(asyncUserActions.authorize(
      message,
      timestamp
    )),
    initialLoad: () => dispatch(asyncUserActions.initialLoad())
  }
}

const defineAdditionalButton = (
  step: TAuthorizationStep,
  loading: boolean,
  system: TSystem,
  onClick: () => void
) => {

  if (system !== 'desktop') {
    return null
  }

  if (loading) {
    return null
  }

  if (step !== 'connect') {
    return null
  }

  return <AdditionalButton
    onClick={onClick}
  >
    Create Smart Wallet
  </AdditionalButton>
}

const defineButtonTitle = (
  step: TAuthorizationStep,
  loading: boolean
) => {
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
    default:
      return 'Loading'
  }
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const defineDashboardName = () => {
  return 'Mainnets Dashboard'
}

const defineSwitchNetworkText = () => {
  return <Text>Please switch the network to <TextBold>Base</TextBold> to continue</Text>
}

const defineRedirectButton = () => {
  return null
}

const createSigMessage = (
  statement: string,
  nonce: string,
  address: string,
  chainId: number
) => {

  return new SiweMessage({
    domain: document.location.host,
    address: address,
    chainId: chainId as number,
    uri: document.location.origin,
    version: '1',
    statement,
    nonce
  })
}

const Main: FC<ReduxType> = ({
  chainId,
  address,
  connectWallet,
  authorize,
  loading,
  authorizationStep,
  initialLoad,
  chainsAvailable
}) => {
  const { address: connectorAddress, connector } = useAccount()
  const connectorChainID = useChainId()
  const { connect, connectors } = useConnect()
  const injectedProvider = connectors.find(connector => connector.id === "injected")
  const signer = useEthersSigner()
  const { open } = useWeb3Modal()
  const system = defineSystem()

  const title = defineTitle(authorizationStep)
  const text = defineText(
    authorizationStep,
    // coinbaseInstance
  )
  useEffect(() => {
    initialLoad()
  }, [])

  useEffect(() => {
    if (
      !connectorAddress ||
      !connectorChainID ||
      !connector ||
      !signer ||
      authorizationStep !== 'connect'
    ) { return }
    connectWallet(
      connectorAddress,
      connectorChainID,
      connector,
      signer,
      chainsAvailable
    )
  }, [connectorAddress, signer, connectorChainID, connector, authorizationStep])

  if (authorizationStep === 'wrong_device') {
    return <ContainerCentered>
    <ImageContainer src={Image} />
    
    <Title>
      Please, use desktop browser
    </Title>
    <Text>
    zkBring dashboard is only available on desktop browsers
    </Text>
  </ContainerCentered>
  }

  if (address && chainId && authorizationStep === 'authorized') {
    return <Redirect to='/campaigns' />
  }

  if (authorizationStep === 'wrong_network') {
    return <ContainerCentered>
      <ImageContainer src={Image} />
      <Title>
        Wrong network
      </Title>
      <Text>
        Please, connect to Base network
      </Text>
      {defineRedirectButton()}
    </ContainerCentered>
  }

  return <ContainerCentered>
    <ImageContainer src={Image} />
    <Title>
      {title}
    </Title>
    <Contents>
      <CheckListItem id='connect' checked={authorizationStep === 'login' || authorizationStep === 'authorized'} />
      <CheckListItem id='login' checked={authorizationStep === 'authorized'} />
    </Contents>
    <Text>
      {text}
    </Text>
    <WidgetButton
      loading={loading}
      disabled={loading || !injectedProvider}
      appearance='action'
      onClick={async () => {
        if (loading || !injectedProvider) {
          return
        }
        if (authorizationStep === 'connect') {
          return open()
        }


        if (authorizationStep === 'login') {
          const timestamp = Date.now()
          const humanReadable = new Date(timestamp).toUTCString()
          const statement = `I'm signing this message to login to zkBring Dashboard at ${humanReadable}`
          const { data: { nonce } } = await nonceApi.get(address)
          const message = createSigMessage(
            statement,
            nonce,
            address,
            chainId as number
          )

          const preparedMessage = message.prepareMessage()
          return authorize(
            preparedMessage,
            timestamp
          )
        }

        return alert('PLEASE TRY AGAIN...')

      }}
      title={defineButtonTitle(authorizationStep, loading)}
    />
    {
      defineAdditionalButton(
        authorizationStep,
        loading,
        system,
        () => {
          const coinbaseConnector = connectors.find(connector => connector.id === "coinbaseWalletSDK")
          if (!coinbaseConnector) {
            return alert('coinbaseWalletSDK Connector not found')
          }
          return connect({ connector: coinbaseConnector })
        }
      )
    }
  </ContainerCentered>
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatcherToProps)(Main)
