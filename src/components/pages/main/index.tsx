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
import { TAuthorizationStep } from 'types'
import { IAppDispatch } from 'data/store'
import { LinkdropSDK } from 'linkdrop-sdk-test'

// const secretKeys = { // x-secret-key
//   '3b2c12979794fa25bf356e1f36c39a80': true,
//   'c6d5ccc194adb1772e0c61fb0ed0fc56': true,
//   '9fbc6d938c398c5c7a8dc3c1b0b4673b': true,
//   '6e3536197ed7c1c9444eb4701ce8b28a': true,
//   'cd3aef8f77c9f46826984cb70a76eca1': true
// }

// const apiKeys = { // x-api-key
//   '354f8c9df32ac9d4af69fadca1509f45': {
//     'localhost:9090': true
//   },
//   '3e42a325855bf9dfc5cf083e255c53b5': {
//     'localhost:3000': true
//   },
//   'TEST-CLIENT-31b96691e36b864425c5570e2f3ce9c8': {
//     'localhost:3000': true
//   },
//   'ee12fe322b9636d628ff36e0ed87d5f7': {},
//   'c72b77c061c976be4bc4f9114ac5e441': {}
// }


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

  useEffect(() => {
    const init = async () => {
      const sdk = new LinkdropSDK({
        apiKey: {
          key: 'TEST-CLIENT-31b96691e36b864425c5570e2f3ce9c8',
          mode: 'client'
        },
        encryptionKey: ''
      })
      const campaign = await sdk.getCampaign(
        '63bc41a1384f19ac512053dc',
        '',
        'a82d55f3bba22fda50c4fcb1803d8ea4c10d94400e85b02cfac648723c74b452'
      )
      console.log({ campaign })
      const batches = await campaign?.getBatches()
      console.log({ batches })
      const batch = await campaign?.getBatch('63bc41a1384f19ac512053de')
      console.log({ batch })

      const linkParams = await sdk.getLinkParams("0x7F07Ec0Baec9D6AAb915Caa2A4fF41BB4865e544")
      console.log({ linkParams })
    }
    init()
    
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
