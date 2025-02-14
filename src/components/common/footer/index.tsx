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
        <LinkStyled href='https://dexscreener.com/base/0xceb9ce741dc04e87366198c7dc96d76ed74dce6c' target='_blank'>
          $BRING
        </LinkStyled>
      </MenuItem>

      <MenuItem>
        <LinkStyled href='https://x.com/zkBring' target='_blank'>
          X (Twitter)
        </LinkStyled>
      </MenuItem>

      <MenuItem>
        <LinkStyled href='https://warpcast.com/~/channel/bring' target='_blank'>
          Warpcast
        </LinkStyled>
      </MenuItem>
    </Menu>
  </Footer>
}

export default FooterComponent