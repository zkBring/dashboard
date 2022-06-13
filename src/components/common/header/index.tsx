import { FC, useState } from 'react'
import {
    Header,
    HeaderTitle,
    HeaderInfo,
    HeaderUserInfo,
    ConnectionIndicator,
    MiniPopupCustomItem,
    NetworkIndicator,
    NetworkIndicatorClass
    // @ts-ignore
} from './styled-components.tsx'
import { Dispatch } from 'redux';
import { useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import themes from 'themes'
import { shortenString, defineNetworkName, capitalize } from 'helpers'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import * as asyncUserActions from 'data/store/reducers/user/async-actions'
import { UserActions } from 'data/store/reducers/user/types'
import MiniPopup from '../mini-popup'
import chains from 'configs/chains'
import { TDefineTitle, LocationType } from './types'

const mapStateToProps = ({ user: { chainId, address, provider } }: RootState) => ({ chainId, address, provider })

const mapDispatcherToProps = (dispatch: Dispatch<UserActions>) => {
  return {
    connectWallet: () => asyncUserActions.connectWallet(dispatch),
    switchNetwork: (provider: any, chainId: number, address: string) => asyncUserActions.switchNetwork(dispatch, provider, chainId, address)
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
    case location.includes('/'):
      return 'Dashboard'
    default:
      return ''
  }
}

const HeaderComponent: FC<Props & ReduxType> = ({ chainId, address, connectWallet, switchNetwork, provider }) => {
  const [ showToggleChain, setShowToggleChain ] = useState(false)
  const location = useLocation<LocationType>()
  console.log({ location })
  const chainsPopup = showToggleChain && <MiniPopup onClose={() => { setShowToggleChain(false) }}>
    {Object.keys(chains).map((chain: string) => {
      const currentChain = chains[Number(chain)]
      return <MiniPopupCustomItem onClick={() => {
        switchNetwork(provider, Number(chain), address)
      }}>
        {currentChain.displayName}
        <NetworkIndicator className={NetworkIndicatorClass} selected={Number(chainId) === Number(chain)} />
      </MiniPopupCustomItem>
    })}
  </MiniPopup>

  return <ThemeProvider theme={themes.light}>
      <Header>
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
          {address && <HeaderUserInfo>
            <ConnectionIndicator />
            {shortenString(address)}
          </HeaderUserInfo>}
          {!address && <HeaderUserInfo onClick={connectWallet}>
            Connect
          </HeaderUserInfo>}
        </HeaderInfo>
      </Header>
  </ThemeProvider>
}


export default connect(mapStateToProps, mapDispatcherToProps)(HeaderComponent)