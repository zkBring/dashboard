import { FC } from 'react'
import {
  Nav,
  Menu,
  MenuItem,
  LinkStyled
} from './styled-components'

const Navigation: FC = () => {
  return <Nav>
    <Menu>
      <MenuItem>
        <LinkStyled to='/'>
          My drops
        </LinkStyled>
      </MenuItem>

      <MenuItem>
        <LinkStyled to='/'>
          How it works
        </LinkStyled>
      </MenuItem>

      <MenuItem>
        <LinkStyled to='/'>
          Support
        </LinkStyled>
      </MenuItem>
    </Menu>
  </Nav>
}

export default Navigation