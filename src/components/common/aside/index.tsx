import { FC, useState } from 'react'
import {
  Aside,
  AsideFooter,
  AsideLogoZone,
  AsideMenu,
  AsideMenuItem,
  AsideLogoIcon,
  AsideTextLink,
  MenuExpanderDot,
  AsideMenuItemExternal,
  AsideMinimizedClassName,
  MenuExpander,
  AsideMenuItemTitle,
  AsideMenuItemTitleClassName
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

  const [ expanded, setExpanded ] = useState<boolean>(true)

  if (authorizationStep !== 'authorized') { return null }

	return <Aside
    className={!expanded ? AsideMinimizedClassName : ''}
  >
    <AsideLogoZone
      expanded={expanded}
    >
      <AsideTextLink to='/campaigns'>
        <AsideLogoIcon src={LinkdropLogo} />
      </AsideTextLink>
      <MenuExpander onClick={() => setExpanded(!expanded)}>
        <MenuExpanderDot />
        <MenuExpanderDot />
        <MenuExpanderDot />
      </MenuExpander>
    </AsideLogoZone>

    <AsideMenu>
      <AsideMenuItem to='/campaigns' active={location.pathname.includes('/campaigns')}>
        <Icons.ClaimLinksIcon />
        <AsideMenuItemTitle className={AsideMenuItemTitleClassName}>Claim Links</AsideMenuItemTitle>
      </AsideMenuItem>
      <AsideMenuItem to='/qrs' active={location.pathname.includes('/qrs')}>
        <Icons.ClaimQRsIcon />
        <AsideMenuItemTitle className={AsideMenuItemTitleClassName}>Claim QRs</AsideMenuItemTitle>
      </AsideMenuItem>
      <AsideMenuItem to='/dynamic-qrs' active={location.pathname.includes('/dispenser')}>
        <Icons.DynamicQRIcon />
        <AsideMenuItemTitle className={AsideMenuItemTitleClassName}>Dynamic QR</AsideMenuItemTitle>
      </AsideMenuItem>
      <AsideMenuItem to='/dispensers' active={location.pathname.includes('/dispenser')}>
        <Icons.DispenserQRIcon />
        <AsideMenuItemTitle className={AsideMenuItemTitleClassName}>Dispenser QR</AsideMenuItemTitle>
      </AsideMenuItem>
      <AsideMenuItem to='/collections' active={location.pathname.includes('/collections')}>
        <Icons.NFTsIcon />
        <AsideMenuItemTitle className={AsideMenuItemTitleClassName}>NFTs</AsideMenuItemTitle>
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
          <Icons.CodeIcon />
          <AsideMenuItemTitle className={AsideMenuItemTitleClassName}>SDK</AsideMenuItemTitle>
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
          <Icons.BookIcon />
          <AsideMenuItemTitle className={AsideMenuItemTitleClassName}>Guide</AsideMenuItemTitle>
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
          <Icons.MessagesIcon />
          <AsideMenuItemTitle className={AsideMenuItemTitleClassName}>Support</AsideMenuItemTitle>
        </AsideMenuItemExternal>
      </AsideMenu>
    </AsideFooter>
  </Aside>
}

export default connect(mapStateToProps)(AsideComponent)