import { FC, useState } from 'react'
import {
  Header,
  ButtonStyled,
  HeaderInfo,
  HeaderUserInfoAddress,
  Logout,
  HeaderNetwork
} from './styled-components'
import {
  shortenString,
  defineNetworkName,
  capitalize,
  defineNativeTokenSymbol,
  defineNetworkIcon
} from 'helpers'
import { Navigation } from '..'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import * as asyncUserActions from 'data/store/reducers/user/async-actions'
import MiniPopup from '../mini-popup'
import chains from 'configs/chains'
import { IProps } from './types'
import { IAppDispatch } from 'data/store'
import { utils } from 'ethers'
import Icons from 'icons'
import { useAccount } from 'wagmi'

const mapStateToProps = ({
  user: {
    chainId, 
    address, 
    provider, 
    nativeTokenAmount,
    chainsAvailable
  }
}: RootState) => ({
  chainId,
  address,
  provider,
  nativeTokenAmount,
  chainsAvailable
})

const mapDispatcherToProps = (dispatch: IAppDispatch ) => {
  return {
    switchNetwork: (chain: number, callback: () => void) => dispatch(asyncUserActions.switchNetwork(chain, callback)),
    logout: () => dispatch(asyncUserActions.logout())
  }
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const HeaderComponent: FC<IProps & ReduxType> = ({
  chainId,
  address,
  nativeTokenAmount,
  switchNetwork,
  provider,
  logout,
  title,
  breadcrumbs,
  chainsAvailable
}) => {
  const [ showToggleChain, setShowToggleChain ] = useState(false)
  const { connector } = useAccount()
  const nativeTokenAmountFormatted = nativeTokenAmount ? utils.formatEther(nativeTokenAmount) : 0

  return <Header breadcrumbs={breadcrumbs}>
    <ButtonStyled to='/campaigns/new' size='small'>
      Launch drop
    </ButtonStyled>
    <Navigation />
    
    <HeaderInfo>
      {chainId && <HeaderNetwork src={defineNetworkIcon(chainId)}/>}
      {address && <HeaderUserInfoAddress>{shortenString(address)}</HeaderUserInfoAddress>}
      {chainId && address && <Logout
        onClick={() => {
          connector?.disconnect()
          logout()
        }}
      >
        <Icons.LogoutIcon />
      </Logout>}
    </HeaderInfo>
  </Header>
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatcherToProps)(HeaderComponent)