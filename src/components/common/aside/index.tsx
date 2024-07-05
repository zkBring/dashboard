import { FC } from 'react'
import {
  Aside,
  AsideFooter,
  AsideLogoZone,
  AsideMenu,
  AsideMenuItem,
  AsideLogoIcon,
  AsideTextLink,
  AsideMenuItemExternal
} from './styled-components'
import LinkdropLogo from 'images/linkdrop-aside.png'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import Icons from 'icons'
import { defineNetworkName, defineIfFeatureIsAvailable } from 'helpers'
import { plausibleApi } from 'data/api'
import { TProps } from './types'

const mapStateToProps = ({
  user: {
    address,
    authorizationStep,
    chainId
  }
}: RootState) => ({
  address,
  authorizationStep,
  chainId
})


interface LocationType {
  pathname: string
}

type ReduxType = ReturnType<typeof mapStateToProps>


const AsideComponent: FC<TProps & ReduxType> = ({
  authorizationStep,
  chainId
}) => {
  // const location = useLocation<LocationType>()
  // if (authorizationStep !== 'authorized') {
  //   return <AsideLogoZone noAside>
  //     <AsideTextLink to='/'>
  //       <AsideLogoIcon src={LinkdropLogo} />
  //     </AsideTextLink>
  //   </AsideLogoZone>
  // }

	return <Aside>
    <AsideLogoZone>
      <AsideTextLink to='/campaigns'>
        <AsideLogoIcon src={LinkdropLogo} />
      </AsideTextLink>
    </AsideLogoZone>

    <AsideMenu>
      <AsideMenuItem to='/campaigns' active={location.pathname.includes('/campaigns')}>
        <Icons.ClaimLinksIcon />
        Claim Links
      </AsideMenuItem>
      <AsideMenuItem to='/qrs' active={location.pathname.includes('/qrs')}>
        <Icons.ClaimQRsIcon />
        Claim QRs
      </AsideMenuItem>
      <AsideMenuItem to='/dynamic-qrs' active={location.pathname.includes('/dispenser')}>
        <Icons.DynamicQRIcon />
        Dynamic QR
      </AsideMenuItem>
      <AsideMenuItem to='/dispensers' active={location.pathname.includes('/dispenser')}>
        <Icons.DispenserQRIcon />
        Dispenser QR
      </AsideMenuItem>
      {/* <AsideMenuItem to='/invite-links' active={location.pathname.includes('/invite-links')}>
        <Icons.InviteLinksIcon />Invite Links
      </AsideMenuItem> */}
      <AsideMenuItem to='/collections' active={location.pathname.includes('/collections')}>
        <Icons.NFTsIcon />
        NFTs
      </AsideMenuItem>
    </AsideMenu>

    <AsideFooter>
      <AsideMenu>
        <AsideMenuItemExternal onClick={() => {
          plausibleApi.invokeEvent({
            eventName: 'start_guide',
            data: {
              network: defineNetworkName(chainId),
              component: 'aside'
            }
          })
          window.open('https://docs.linkdrop.io/how-tos/main-guide/setting-up-a-campaign', '_blank')
        }}>
          <Icons.CodeIcon /> SDK
        </AsideMenuItemExternal>
        <AsideMenuItemExternal onClick={() => {
          plausibleApi.invokeEvent({
            eventName: 'legal_docs',
            data: {
              network: defineNetworkName(chainId),
              component: 'aside'
            }
          })
          window.open('https://linkdrop.notion.site/Terms-and-Privacy-dfa7d9b85698491d9926cbfe3c9a0a58', '_blank')
        }}>
          <Icons.BookIcon /> Guide
        </AsideMenuItemExternal>
        <AsideMenuItemExternal onClick={async () => {
          plausibleApi.invokeEvent({
            eventName: 'contact',
            data: {
              network: defineNetworkName(chainId),
              component: 'aside'
            }
          })
          window.open('https://linkdrop.io/contact-us', '_blank')
        }}>
          <Icons.MessagesIcon /> Support
        </AsideMenuItemExternal>
      </AsideMenu>
    </AsideFooter>
  </Aside>
}

export default connect(mapStateToProps)(AsideComponent)