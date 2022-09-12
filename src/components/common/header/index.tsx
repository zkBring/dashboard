import { FC, useState } from 'react'
import {
    Header,
    HeaderTitle,
    HeaderInfo,
    HeaderUserInfo,
    HeaderUserInfoAddress,
    MiniPopupCustomItem,
    NetworkIndicator,
    NetworkIndicatorClass
    // @ts-ignore
} from './styled-components.tsx'
import { useLocation, useHistory } from 'react-router-dom'
import { shortenString, defineNetworkName, capitalize, defineNativeTokenSymbol } from 'helpers'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import * as asyncUserActions from 'data/store/reducers/user/async-actions'
import MiniPopup from '../mini-popup'
import chains from 'configs/chains'
import { TDefineTitle, LocationType } from './types'
import { IAppDispatch } from 'data/store'

const mapStateToProps = ({ user: { chainId, address, provider } }: RootState) => ({ chainId, address, provider })

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    connectWallet: () => asyncUserActions.connectWallet(dispatch),
    switchNetwork: (provider: any, chainId: number, address: string, callback: () => void) => asyncUserActions.switchNetwork(dispatch, provider, chainId, address, callback),
    logout: () => dispatch(asyncUserActions.logout())
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

interface Props {}

const defineTitle: TDefineTitle = (location) => {
  switch(true) {
    case location.includes('/campaigns/new/erc20/initial'):
    case location.includes('/campaigns/new/erc20/secure'):
    case location.includes('/campaigns/new/erc20/generate'):
    case location.includes('/campaigns/new/erc20/approve'):
      return 'New ERC20 Campaign'
    case location.includes('/campaigns/new/erc721/initial'):
    case location.includes('/campaigns/new/erc721/secure'):
    case location.includes('/campaigns/new/erc721/generate'):
    case location.includes('/campaigns/new/erc721/approve'):
      return 'New ERC721 Campaign'
    case location.includes('/campaigns/new/erc1155/initial'):
    case location.includes('/campaigns/new/erc1155/secure'):
    case location.includes('/campaigns/new/erc1155/generate'):
    case location.includes('/campaigns/new/erc1155/approve'):
      return 'New ERC1155 Campaign'
    
    case location.includes('/campaigns/edit/erc20'):
      return 'Edition of ERC20 Campaign'
    case location.includes('/campaigns/edit/erc721'):
      return 'Edition of ERC721 Campaign'
    case location.includes('/campaigns/edit/erc1155'):
      return 'Edition of ERC1155 Campaign'
    
      case location.includes('/qrs/'):
      return "QR Campaign"
    case location.includes('/qrs'):
      return "Your QR Campaigns"
    
    case location.includes('/campaigns'):
      return 'Campaigns'
    default:
      return ''
  }
}

const HeaderComponent: FC<Props & ReduxType> = ({ chainId, address, connectWallet, switchNetwork, provider, logout }) => {
  const [ showToggleChain, setShowToggleChain ] = useState(false)
  const [ showUserOptions, setShowUserOptions ] = useState(false)
  const location = useLocation<LocationType>()
  const history = useHistory()
  const chainsPopup = showToggleChain && <MiniPopup onClose={() => { setShowToggleChain(false) }}>
    {Object.keys(chains).map((chain: string) => {
      const currentChain = chains[Number(chain)]
      return <MiniPopupCustomItem onClick={() => {
        switchNetwork(provider, Number(chain), address, () => history.push('/'))
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

  return <Header>
    <HeaderTitle>
      {defineTitle(location.pathname)}
    </HeaderTitle>
    <HeaderInfo>
      {chainId && <HeaderUserInfo onClick={() => {
        setShowToggleChain(!showToggleChain)
      }}>
        {capitalize(defineNetworkName(chainId))}
        {chainsPopup}
      </HeaderUserInfo>}
      {address && <HeaderUserInfo onClick={() => {
        setShowUserOptions(!showUserOptions)
      }}>
        {defineNativeTokenSymbol({ chainId })}
        <HeaderUserInfoAddress>{shortenString(address)}</HeaderUserInfoAddress>
        {userOptionsPopup}
      </HeaderUserInfo>}
    </HeaderInfo>
  </Header>
}


export default connect(mapStateToProps, mapDispatcherToProps)(HeaderComponent)