import { FC } from 'react'
import {
  Footer,
  Menu,
  MenuItem,
  LinkStyled,
  Version
} from './styled-components'

const FooterComponent = () => {
  return <Footer>
    <Version>
      version 1.0.25
    </Version>
    <Menu>
      <MenuItem>
        <LinkStyled>
          $BRING
        </LinkStyled>
      </MenuItem>

      <MenuItem>
        <LinkStyled>
          X (Twitter)
        </LinkStyled>
      </MenuItem>

      <MenuItem>
        <LinkStyled>
          Warpcast
        </LinkStyled>
      </MenuItem>
    </Menu>
  </Footer>
}

export default FooterComponent