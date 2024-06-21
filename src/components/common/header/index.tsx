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
  PolygonIcon,
  Logout
} from './styled-components'
import { shortenString, defineNetworkName, capitalize, defineNativeTokenSymbol } from 'helpers'
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

const defineNetworkLogo = (chainId: number | null) => {
  if (!chainId) { return null }
  switch (chainId) {
    case 137:
      return <PolygonIcon />
    default:
      return null
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
  const chainsPopup = showToggleChain && <MiniPopup onClose={() => { setShowToggleChain(false) }}>
    {Object.keys(chains).map((chain: string) => {
      if (chainsAvailable.length > 0 && !chainsAvailable.find(network => Number(chain) === Number(network))) {
        return null
      }
      const currentChain = chains[Number(chain)]
      return <MiniPopupCustomItem onClick={() => {
        switchNetwork(Number(chain), () => { window.location.reload() })
      }}>
        {currentChain.displayName}
        <NetworkIndicator className={NetworkIndicatorClass} selected={Number(chainId) === Number(chain)} />
      </MiniPopupCustomItem>
    })}
  </MiniPopup>

  // onClick={() => {
  //   logout()
  // }}

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
      {address && <HeaderUserInfoPadded>
        {nativeTokenAmount !== null ? parseFloat(Number((nativeTokenAmountFormatted)).toFixed(3)) : 0} {defineNativeTokenSymbol({ chainId })}
        <HeaderUserInfoAddress>{shortenString(address)}</HeaderUserInfoAddress>
      </HeaderUserInfoPadded>}

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


export default connect(mapStateToProps, mapDispatcherToProps)(HeaderComponent)