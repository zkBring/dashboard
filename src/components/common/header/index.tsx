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
import { TDefineTitle, LocationType, TDefineBreadcrumbs } from './types'
import { IAppDispatch } from 'data/store'
import Breadcrumbs from '../breadcrumbs';

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

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

interface Props {}

const defineTitle: TDefineTitle = (location) => {
  const locationUpdated = location.toLowerCase()
  switch(true) {
    case locationUpdated.includes('/campaigns/new'):
    case locationUpdated.includes('/campaigns/new/initial'):
    case locationUpdated.includes('/campaigns/new/erc20/secure'):
    case locationUpdated.includes('/campaigns/new/erc20/generate'):
    case locationUpdated.includes('/campaigns/new/erc20/approve'):
    case locationUpdated.includes('/campaigns/new/erc721/secure'):
    case locationUpdated.includes('/campaigns/new/erc721/generate'):
    case locationUpdated.includes('/campaigns/new/erc721/approve'):
    case locationUpdated.includes('/campaigns/new/erc1155/secure'):
    case locationUpdated.includes('/campaigns/new/erc1155/generate'):
    case locationUpdated.includes('/campaigns/new/erc1155/approve'):
      return 'New Campaign'
    
    case locationUpdated.includes('/campaigns/edit/erc20'):
    case locationUpdated.includes('/campaigns/edit/erc721'):
    case locationUpdated.includes('/campaigns/edit/erc1155'):
      return 'New Batch'
    
      case locationUpdated.includes('/qrs/'):
      return "QR set manager"
    case locationUpdated.includes('/qrs'):
      return "QR manager"
    
    case locationUpdated.includes('/campaigns'):
      return 'Campaigns'
    default:
      return ''
  }
}

const defineBreadcrumbs: TDefineBreadcrumbs = (location) => {
  const locationUpdated = location.toLowerCase()
  switch(true) {
    

    case locationUpdated.includes('/campaigns/new/erc20/initial'):
    case locationUpdated.includes('/campaigns/new/erc1155/initial'):
    case locationUpdated.includes('/campaigns/new/erc721/initial'):
    case locationUpdated.includes('/campaigns/edit/erc20') && locationUpdated.includes('/initial'):
    case locationUpdated.includes('/campaigns/edit/erc721') && locationUpdated.includes('/initial'):
    case locationUpdated.includes('/campaigns/edit/erc1155') && locationUpdated.includes('/initial'):
      return <Breadcrumbs
        items={
          [{
            title: 'Campaign setup',
            status: 'done'
          }, {
            title: 'Distribution',
            status: 'current'
          }, {
            title: 'Permission'
          }, {
            title: 'Launch'
          }]
        }
      />

    case locationUpdated.includes('/campaigns/new/erc20/approve'):
    case locationUpdated.includes('/campaigns/new/erc721/approve'):
    case locationUpdated.includes('/campaigns/new/erc1155/approve'):
    case locationUpdated.includes('/campaigns/edit/erc20') && locationUpdated.includes('/approve'):
    case locationUpdated.includes('/campaigns/edit/erc721') && locationUpdated.includes('/approve'):
    case locationUpdated.includes('/campaigns/edit/erc1155') && locationUpdated.includes('/approve'):
      return <Breadcrumbs
        items={
          [{
            title: 'Campaign setup',
            status: 'done'
          }, {
            title: 'Distribution',
            status: 'done'
          }, {
            title: 'Permission',
            status: 'current'
          }, {
            title: 'Launch'
          }]
        }
      />

    case locationUpdated.includes('/campaigns/new/erc20/secure'):
    case locationUpdated.includes('/campaigns/new/erc721/secure'):
    case locationUpdated.includes('/campaigns/new/erc1155/secure'):
    case locationUpdated.includes('/campaigns/edit/erc20') && locationUpdated.includes('/secure'):
    case locationUpdated.includes('/campaigns/edit/erc721') && locationUpdated.includes('/secure'):
    case locationUpdated.includes('/campaigns/edit/erc1155') && locationUpdated.includes('/secure'):
      return <Breadcrumbs
        items={
          [{
            title: 'Campaign setup',
            status: 'done'
          }, {
            title: 'Distribution',
            status: 'done'
          }, {
            title: 'Permission',
            status: 'done'
          }, {
            title: 'Launch',
            status: 'current'
          }]
        }
      />
    case locationUpdated.includes('/campaigns/edit/erc20') && locationUpdated.includes('/new'):
    case locationUpdated.includes('/campaigns/edit/erc721') && locationUpdated.includes('/new'):
    case locationUpdated.includes('/campaigns/edit/erc1155') && locationUpdated.includes('/new'):
    case locationUpdated.includes('/campaigns/new'):
      return <Breadcrumbs
        items={
          [{
            title: 'Campaign setup',
            status: 'current'
          }, {
            title: 'Distribution'
          }, {
            title: 'Permission'
          }, {
            title: 'Launch'
          }]
        }
      />
    default:
      return null
  }
}

const HeaderComponent: FC<Props & ReduxType> = ({
  chainId,
  address,
  nativeTokenAmountFormatted,
  switchNetwork,
  provider,
  logout
}) => {
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
      {defineBreadcrumbs(location.pathname)}
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
        {nativeTokenAmountFormatted !== null ? parseFloat(Number((nativeTokenAmountFormatted)).toFixed(3)) : 0} {defineNativeTokenSymbol({ chainId })}
        <HeaderUserInfoAddress>{shortenString(address)}</HeaderUserInfoAddress>
        {userOptionsPopup}
      </HeaderUserInfo>}
    </HeaderInfo>
  </Header>
}


export default connect(mapStateToProps, mapDispatcherToProps)(HeaderComponent)