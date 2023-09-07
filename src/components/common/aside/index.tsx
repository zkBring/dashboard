import { FC } from 'react'
import {
  Aside,
  AsideFooter,
  AsideLogoZone,
  AsideMenu,
  AsideMenuItem,
  AsideLogoIcon,
  AsideTextLink,
  AsideMenuItemExternal,
  AsideTitle
} from './styled-components'
import { useLocation } from 'react-router-dom'
import LinkDropLogo from 'images/linkdrop-logo.png'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import Icons from 'icons'
import { defineNetworkName, defineIfFeatureIsAvailable } from 'helpers'
import { plausibleApi } from 'data/api'

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

interface AsideProps {}

interface LocationType {
  pathname: string
}

type ReduxType = ReturnType<typeof mapStateToProps>


const AsideComponent: FC<AsideProps & ReduxType> = ({
  authorizationStep,
  chainId
}) => {
  const location = useLocation<LocationType>()
  if (authorizationStep !== 'authorized') {
    return <AsideLogoZone noAside>
      <AsideTextLink to='/'>
        <AsideLogoIcon src={LinkDropLogo} />
      </AsideTextLink>
    </AsideLogoZone>
  }
	return <Aside>
    <AsideLogoZone>
      <AsideTextLink to='/campaigns'>
        <AsideLogoIcon src={LinkDropLogo} />
      </AsideTextLink>
    </AsideLogoZone>

    <AsideMenu>
      <AsideMenuItem to='/campaigns' active={location.pathname.includes('/campaigns')}>
        <Icons.CampaignsIcon />Claim Links
      </AsideMenuItem>
      <AsideMenuItem to='/qrs' active={location.pathname.includes('/qrs')}>
        <Icons.QRManagerIcon />QR Manager
      </AsideMenuItem>
      <AsideMenuItem to='/dispensers' active={location.pathname.includes('/dispenser')}>
        <Icons.DispenserIcon />Dispensers
      </AsideMenuItem>
      <AsideMenuItem to='/invite-links' active={location.pathname.includes('/invite-links')}>
        <Icons.InviteLinksIcon />Invite Links
      </AsideMenuItem>
      <AsideMenuItem to='/collections' active={location.pathname.includes('/collections')}>
        <Icons.QRManagerIcon />Minter
      </AsideMenuItem>
    </AsideMenu>

    <AsideFooter>
      <AsideTitle>Misc</AsideTitle>
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
          <Icons.BookIcon />Start guide
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
          <Icons.LegalIcon />Legal
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
          <Icons.ContactUsIcon />Contact us
        </AsideMenuItemExternal>
      </AsideMenu>
    </AsideFooter>
  </Aside>
}

export default connect(mapStateToProps)(AsideComponent)