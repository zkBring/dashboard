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
  AsideLogoText,
  AsideTitle
} from './styled-components'
import { useLocation } from 'react-router-dom'
import LinkDropLogo from 'images/linkdrop-logo.png'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import Icons from 'icons'

const mapStateToProps = ({
  user: {
    address,
    authorizationStep
  }
}: RootState) => ({
  address,
  authorizationStep
})

interface AsideProps {}

interface LocationType {
  pathname: string
}

type ReduxType = ReturnType<typeof mapStateToProps>


const AsideComponent: FC<AsideProps & ReduxType> = ({
  authorizationStep
}) => {
  const location = useLocation<LocationType>()
  if (authorizationStep !== 'authorized') {
    return <AsideLogoZone noAside>
      <AsideTextLink to='/'>
        <AsideLogoIcon src={LinkDropLogo} />
        <AsideLogoText>LinkDrop</AsideLogoText>
      </AsideTextLink>
    </AsideLogoZone>
  }
	return <Aside>
    <AsideLogoZone>
      <AsideTextLink to='/campaigns'>
        <AsideLogoIcon src={LinkDropLogo} />
        <AsideLogoText>LinkDrop</AsideLogoText>
      </AsideTextLink>
    </AsideLogoZone>

    <AsideMenu>
      <AsideMenuItem to='/campaigns' active={location.pathname.includes('/campaigns')}>
        <Icons.CampaignsIcon />Campaigns
      </AsideMenuItem>
      <AsideMenuItem to='/qrs' active={location.pathname.includes('/qrs')}>
        <Icons.QRManagerIcon />QR-manager
      </AsideMenuItem>
    </AsideMenu>

    <AsideFooter>
      <AsideTitle>Misc</AsideTitle>
      <AsideMenu>
        <AsideMenuItemExternal href='https://linkdrop.notion.site/Terms-and-Privacy-dfa7d9b85698491d9926cbfe3c9a0a58' target="_blank">
          <Icons.LegalIcon />Legal
        </AsideMenuItemExternal>
        <AsideMenuItemExternal href='https://v1-2.dashboard.linkdrop.io' target="_blank">
          <Icons.GoToOldVersionIcon />Go to old version
        </AsideMenuItemExternal>
        <AsideMenuItemExternal href='https://linkdrop.io/pricing/' target="_blank">
          <Icons.ContactUsIcon />Contact us
        </AsideMenuItemExternal>
      </AsideMenu>
    </AsideFooter>
  </Aside>
}

export default connect(mapStateToProps)(AsideComponent)