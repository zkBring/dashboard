import { Link } from "react-router-dom"
import styled from "styled-components"

export const Nav = styled.nav`

`

export const Menu = styled.ul`
  display: flex;
  align-self: center;
  gap: 50px;
  margin: 0;
  padding: 0;
  list-style: none;
`

export const MenuItem = styled.li`

`

export const LinkStyled = styled(Link)`
  color: ${props => props.theme.primaryTextColor};
  font-size: 15px;
  text-decoration: none;
`

