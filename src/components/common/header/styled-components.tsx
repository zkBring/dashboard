import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom'
import Icons from 'icons'
import { Button } from '..';

type THeaderProps = {
  breadcrumbs: boolean
}

export const Header = styled.header<THeaderProps>`
  display: grid;
  grid-template-columns: max-content max-content 1fr;
  align-items: center;
  width: 100%;
  padding: 20px 50px;
  height: 78px;
  gap: 40px;
`

export const HeaderLogo = styled.div`

`

export const HeaderNetwork = styled.img`
  display: block;
  max-width: 16px;
  margin-right: 6px;
`

export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;
`

export const HeaderUserInfoAddress = styled.div`
  color: ${props => props.theme.primaryTextColor};
  font-size: 15px;
  margin-right: 11px;
`

export const Logout = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const ButtonStyled = styled(Button)`

`