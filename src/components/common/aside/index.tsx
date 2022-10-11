import { FC } from 'react'
import {
  Aside,
  AsideFooter,
  AsideLogoZone,
  AsideMenu,
  AsideMenuItem,
  AsideLogoIcon,
  FooterMenu,
  AsideTextLink,
  FooterButton,
  AsideLogoText
// @ts-ignore
} from './styled-components.tsx'
import { useLocation } from 'react-router-dom'


import { ThemeProvider } from 'styled-components'
import themes from 'themes'
import Icons from 'icons'
import LinkDropLogo from 'images/linkdrop-logo.png'

interface AsideProps {}

interface LocationType {
  pathname: string
}

const AsideComponent: FC<AsideProps> = () => {
  const location = useLocation<LocationType>()
	return <ThemeProvider theme={themes.light}>
    <Aside>
      <AsideLogoZone>
        <AsideTextLink to='/'>
          <AsideLogoIcon src={LinkDropLogo} />
          <AsideLogoText>LinkDrop</AsideLogoText>
        </AsideTextLink>
      </AsideLogoZone>

      <AsideMenu>
        <AsideMenuItem to='/campaigns' active={location.pathname.includes('/campaigns')}>
          Campaigns
        </AsideMenuItem>
        <AsideMenuItem to='/qrs' active={location.pathname.includes('/qrs')}>
          QR-manager
        </AsideMenuItem>
      </AsideMenu>

      <AsideFooter>
        <FooterMenu>
          <FooterButton>Go to old version</FooterButton>
          <FooterButton>Contact us</FooterButton>
        </FooterMenu>
      </AsideFooter>
    </Aside>
  </ThemeProvider>
}

export default AsideComponent