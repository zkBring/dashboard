import { FC } from 'react'
import {
  Aside,
  AsideFooter,
  AsideLogoZone,
  AsideMenu,
  AsideMenuItem,
  AsideLogoIcon,
  AsideCopyright,
  FooterMenu,
  AsideTextLink,
  FooterLink
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
  console.log(location.pathname)
	return <ThemeProvider theme={themes.light}>
    <Aside>
      <AsideLogoZone>
        <AsideTextLink to='/'>
          <AsideLogoIcon src={LinkDropLogo} />
        </AsideTextLink>
      </AsideLogoZone>

      <AsideMenu>
        <AsideMenuItem to='/' active={location.pathname === '/'}>
          Dashboard
        </AsideMenuItem>
        <AsideMenuItem to='/campaigns' active={location.pathname.includes('/campaigns')}>
          Campaigns
        </AsideMenuItem>
        {false && <AsideMenuItem to='/qrs' active={location.pathname.includes('/qrs')}>
          QR-manager
        </AsideMenuItem>}
      </AsideMenu>

      <AsideFooter>
        <FooterMenu>
          <FooterLink
            href='https://www.notion.so/Terms-and-Privacy-dfa7d9b85698491d9926cbfe3c9a0a58'
            target='_blank'
          >
            Legal
          </FooterLink>
          <FooterLink
            href='https://linkdrop.io/'
            target='_blank'
          >
            Contact Us
          </FooterLink>
        </FooterMenu>
        <AsideCopyright>
          © Linkdrop Labs, Inc
        </AsideCopyright>
      </AsideFooter>
    </Aside>
  </ThemeProvider>
}

export default AsideComponent