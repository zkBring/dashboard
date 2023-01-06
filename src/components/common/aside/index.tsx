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
  address,
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
      <FooterMenu>
        <FooterButton target="_blank" href="https://v1-2.dashboard.linkdrop.io">Go to old version</FooterButton>
        <FooterButton target="_blank" href="https://linkdrop.io/pricing/">Contact us</FooterButton>
      </FooterMenu>
    </AsideFooter>
  </Aside>
}

export default connect(mapStateToProps)(AsideComponent)