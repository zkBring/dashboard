import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom'
import TextLink from '../text-link'

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 245px;
  background-color: ${props => props.theme.asideBackgroundColor};
`

export const AsideLogoZone = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 24px 50px;
  min-height: 100px;
`
export const AsideLogoIcon = styled.img`
  max-width: 100px;
`

export const AsideMenu = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
`

interface AsideMenuItemProps {
  active: boolean;
  disabled: boolean;
}

export const AsideMenuItemIconClassName = 'AsideMenuItemIcon'

export const AsideMenuItem = styled(Link)<AsideMenuItemProps>`
  margin: 0;
  min-height: 56px;
  color: ${props => props.theme.additionalTextColor};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 20px 32px;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  margin-bottom: 6px;
  transition: background-color .3s;

  &:hover {
    ${props => !props.disabled && !props.active && css`
      color: ${props => props.theme.primaryTextColor};
    `}
  }

  ${props => props.active && css`
    color: ${props => props.theme.primaryTextColor};
    padding-left: 22px;
    border-left: 10px solid ${props => props.theme.primaryHighlightColor};
  `}

  ${props => props.disabled && css`
    opacity: .3;
    cursor: not-allowed;
  `}

  .${AsideMenuItemIconClassName} {
    margin-right: 24px;
  }
`

export const AsideFooter = styled.div`
  width: 100%;
  margin-top: auto;
  border-top: 1px solid ${props => props.theme.primaryBorderColor};
`

export const AsideTitle = styled.h2`
  color: ${props => props.theme.primaryTextColor};
  font-size: 26px;
  flex: 1;
  display: flex;
  font-weight: 400;
  align-items: center;
  margin: 0;
`

export const AsideTextLink = styled(TextLink)`
  display: flex;
`

export const FooterMenu = styled.div`
  display: flex;
  padding: 20px 32px;
  justify-content: space-between;
`

export const FooterLink = styled(TextLink)`
  color: ${props => props.theme.additionalTextColor};
  text-decoration: none;

  &:visited {
    color: ${props => props.theme.additionalTextColor};
  }
`

export const AsideCopyright = styled.div`
  color: ${props => props.theme.additionalTextColor};
  text-decoration: none;
  padding: 0px 32px 20px;
`