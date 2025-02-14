import { FC } from 'react'
import {
  Nav,
  Menu,
  MenuItem,
  LinkStyled,
  activeClassName
} from './styled-components'

const Navigation: FC = () => {
  return <Nav>
    <Menu>
      <MenuItem>
        <LinkStyled to='/campaigns' activeClassName={activeClassName} exact>
          My drops
        </LinkStyled>
      </MenuItem>

      <MenuItem>
        <LinkStyled to='/about' activeClassName={activeClassName} exact>
          How it works
        </LinkStyled>
      </MenuItem>

      <MenuItem>
        <LinkStyled to='/support' activeClassName={activeClassName} exact>
          Support
        </LinkStyled>
      </MenuItem>
    </Menu>
  </Nav>
}

export default Navigation