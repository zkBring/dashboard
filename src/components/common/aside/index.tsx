import React, { FC } from 'react'

import {
  Aside,
  AsideTitle,
  AsideFooter,
  AsideLogoZone,
  AsideMenu,
  AsideMenuItem,
  AsideLogoIcon,
  AsideMenuItemIconClassName
// @ts-ignore
} from './styled-components.tsx'
import { useLocation } from 'react-router-dom'


import { ThemeProvider } from 'styled-components'
import themes from 'themes'
import Icons from 'icons'

interface AsideProps {}

interface LocationType {
  pathname: string
}

const AsideComponent: FC<AsideProps> = () => {
  const location = useLocation<LocationType>()
	return <ThemeProvider theme={themes.light}>
    <Aside>
      <AsideLogoZone>
        <AsideLogoIcon>
          x
        </AsideLogoIcon>
        <AsideTitle>LinkDrop</AsideTitle>
        {false && <Icons.LinkdropTextLogo />}
      </AsideLogoZone>

      <AsideMenu>
        <AsideMenuItem to='/' active={location.pathname === '/'}>
          Dashboard
        </AsideMenuItem>
        <AsideMenuItem to='/campaigns' active={location.pathname === '/campaigns'}>
          Campaigns
        </AsideMenuItem>
      </AsideMenu>

      <AsideFooter>
        <AsideMenu>
          <AsideMenuItem disabled>
            <Icons.SupportMenuIcon className={AsideMenuItemIconClassName} />
            Support
          </AsideMenuItem>
          <AsideMenuItem disabled>
            <Icons.FaqMenuIcon className={AsideMenuItemIconClassName} />
            FAQ
          </AsideMenuItem>
          <AsideMenuItem disabled>
            <Icons.DocsMenuIcon className={AsideMenuItemIconClassName} />
            Legal
          </AsideMenuItem>
        </AsideMenu>
      </AsideFooter>

    </Aside>
  </ThemeProvider>
}

export default AsideComponent