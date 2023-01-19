import { FC, useState } from 'react'
import {
    Header,
    HeaderTitle,
    HeaderInfo,
    HeaderUserInfo,
    HeaderUserInfoPadded,
    HeaderUserInfoAddress,
    MiniPopupCustomItem,
    NetworkIndicator,
    NetworkIndicatorClass,
    PolygonIcon
    // @ts-ignore
} from './styled-components.tsx'
import { useHistory } from 'react-router-dom'
import { shortenString, defineNetworkName, capitalize, defineNativeTokenSymbol } from 'helpers'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import * as asyncUserActions from 'data/store/reducers/user/async-actions'
import MiniPopup from '../mini-popup'
import chains from 'configs/chains'
import { IProps } from './types'
import { IAppDispatch } from 'data/store'

const mapStateToProps = ({
  user: {
    chainId, 
    address, 
    provider, 
    nativeTokenAmountFormatted
  }
}: RootState) => ({
  chainId,
  address,
  provider,
  nativeTokenAmountFormatted
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    connectWallet: () => asyncUserActions.connectWallet(dispatch),
    switchNetwork: (provider: any, chainId: number, address: string, callback: () => void) => asyncUserActions.switchNetwork(dispatch, provider, chainId, address, callback),
    logout: () => dispatch(asyncUserActions.logout())
  }
}

const defineNetworkLogo = (chainId: number | null) => {
  if (!chainId) { return null }
  switch (chainId) {
    case 137:
      return <PolygonIcon />
    default:
      return null
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const HeaderComponent: FC<IProps & ReduxType> = ({
  chainId,
  address,
  nativeTokenAmountFormatted,
  switchNetwork,
  provider,
  logout,
  title,
  breadcrumbs
}) => {
  const [ showToggleChain, setShowToggleChain ] = useState(false)
  const [ showUserOptions, setShowUserOptions ] = useState(false)
  
  const history = useHistory()
  const chainsPopup = showToggleChain && <MiniPopup onClose={() => { setShowToggleChain(false) }}>
    {Object.keys(chains).map((chain: string) => {
      const currentChain = chains[Number(chain)]
      return <MiniPopupCustomItem onClick={() => {
        switchNetwork(provider, Number(chain), address, () => { window.location.reload() })
      }}>
        {currentChain.displayName}
        <NetworkIndicator className={NetworkIndicatorClass} selected={Number(chainId) === Number(chain)} />
      </MiniPopupCustomItem>
    })}
  </MiniPopup>

  const userOptionsPopup = showUserOptions && <MiniPopup onClose={() => { setShowUserOptions(false) }}>
    <MiniPopupCustomItem onClick={() => {
      logout()
    }}>
      Logout
    </MiniPopupCustomItem>
  </MiniPopup>

  return <Header breadcrumbs={breadcrumbs}>
    <HeaderTitle>
      {title}
      {breadcrumbs}
    </HeaderTitle>
    <HeaderInfo>
      {chainId && <HeaderUserInfo onClick={() => {
        setShowToggleChain(!showToggleChain)
      }}>
        {defineNetworkLogo(chainId)}
        {capitalize(defineNetworkName(chainId))}
        {chainsPopup}
      </HeaderUserInfo>}
      {address && <HeaderUserInfoPadded onClick={() => {
        setShowUserOptions(!showUserOptions)
      }}>
        {nativeTokenAmountFormatted !== null ? parseFloat(Number((nativeTokenAmountFormatted)).toFixed(3)) : 0} {defineNativeTokenSymbol({ chainId })}
        <HeaderUserInfoAddress>{shortenString(address)}</HeaderUserInfoAddress>
        {userOptionsPopup}
      </HeaderUserInfoPadded>}
    </HeaderInfo>
  </Header>
}


export default connect(mapStateToProps, mapDispatcherToProps)(HeaderComponent)