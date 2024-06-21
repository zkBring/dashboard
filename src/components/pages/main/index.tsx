import { FC, useEffect } from 'react'
import {
  WidgetButton,
  ContainerCentered,
  Title,
  ImageContainer,
  Contents,
  Text,
  List,
  ListItem,
  TextBold
} from './styled-components'
import Image from 'images/connect-image.png'
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
import { useEthersSigner } from 'hooks'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { SiweMessage } from 'siwe'
import { nonceApi, dashboardKeyApi } from 'data/api'
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
    getDashboardKey: (
      message: string,
      key_id: string,
      is_coinbase: boolean,
      encrypted_key?: string
    ) => dispatch(asyncUserActions.getDashboardKey(
      message,
      key_id,
      is_coinbase,
      encrypted_key
    )),
    initialLoad: () => dispatch(asyncUserActions.initialLoad())
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

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const defineDashboardName = () => {
  if (REACT_APP_CHAINS === '[5,80001,84531]') {
    return 'Testnets Dashboard'
  }
  if (REACT_APP_CHAINS === '[1,137,8453]') {
    return 'Mainnets Dashboard'
  }
  return 'Development Dashboard'
}

const defineSwitchNetworkText = () => {
  if (REACT_APP_CHAINS === '[5,80001,84531]') {
    return <Text>Please switch the network to <TextBold>Goerli</TextBold>, <TextBold>Mumbai</TextBold> or <TextBold>BaseGoerli</TextBold> to continue</Text>
  }
  if (REACT_APP_CHAINS === '[1,137,8453]') {
    return <Text>Please switch the network to <TextBold>Polygon</TextBold>, <TextBold>Mainnet</TextBold> or <TextBold>Base</TextBold> to continue</Text>
  }
  return <Text>Please switch the network to <TextBold>Polygon</TextBold>, <TextBold>Mainnet</TextBold>, <TextBold>Base</TextBold>, <TextBold>Goerli</TextBold>, <TextBold>Mumbai</TextBold> or <TextBold>BaseGoerli</TextBold>, to continue</Text>  
}

const defineRedirectButton = () => {
  if (!REACT_APP_CHAINS) { return null }
  if (REACT_APP_CHAINS === '[5,80001,84531]') {
    return <WidgetButton appearance='action' href={REACT_APP_MAINNETS_URL}>
      Switch to Main Dashboard
    </WidgetButton>
  }
  if (REACT_APP_CHAINS === '[1,137,8453]') {
    return <WidgetButton appearance='action' href={REACT_APP_TESTNETS_URL}>
      Switch to Testnet Dashboard
    </WidgetButton>
  }
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
  getDashboardKey,
  chainsAvailable
}) => {
  const { address: connectorAddress, connector } = useAccount()
  const connectorChainID = useChainId()
  const { connect, connectors } = useConnect()
  const injectedProvider = connectors.find(connector => connector.id === "injected")
  const signer = useEthersSigner()
  const { open } = useWeb3Modal()

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

  if (authorizationStep === 'no_injected_extension') {
    return <ContainerCentered>
      <ImageContainer src={Image} />
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
      <ImageContainer src={Image} />
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
    <ImageContainer src={Image} />
    <Title>
    Share Tokens and NFTs through Claim Links
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
          const statement = `I'm signing this message to login to Linkdrop Dashboard at ${humanReadable}`
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

        // for store key
        if (authorizationStep === 'store-key') {
          const dashboardKeyData = await dashboardKeyApi.get()
          const { encrypted_key, sig_message, key_id } = dashboardKeyData.data
          const isCoinbase = connector ? connector.id === "coinbaseWalletSDK" : false
          console.log({ isCoinbase })
          return getDashboardKey(
            sig_message,
            key_id,
            isCoinbase,
            encrypted_key
          )
        }
        return alert('PLEASE TRY AGAIN...')

      }}
      title={defineButtonTitle(authorizationStep, loading)}
    />
  </ContainerCentered>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Main)
