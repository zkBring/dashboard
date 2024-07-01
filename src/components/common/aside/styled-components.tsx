import styled, { css } from 'styled-components';
import TextLink from '../text-link'
import { Link } from 'react-router-dom'

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  min-width: 52px;
  max-width: 52px;
  background-color: ${props => props.theme.primaryBackgroundColor};
`

export const AsideLogoZone = styled.div<{ noAside?: boolean }>`
  display: flex;
  align-items: center;
  padding: 32px 8px;

  ${props => props.noAside && css`{
    position: absolute;
  }`}
`

export const AsideLogoIcon = styled.img`
  max-width: 36px;
  margin-right: 6px;
`

export const AsideLogoText = styled.h4`
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  color: ${props => props.theme.primaryTextColor};
`

export const AsideSubtitle = styled.h3`
  margin: 0 0 4px;
  padding: 0 16px;
  color: ${props => props.theme.additionalTextColor};
`

export const AsideMenu = styled.div`
  margin: 0;
  padding: 0 8px 0 8px;
  list-style: none;
  width: 100%;
`

interface AsideMenuItemProps {
  active?: boolean;
  disabled?: boolean;
}

export const AsideMenuItemIconClassName = 'AsideMenuItemIcon'

export const AsideMenuItem = styled(Link)<AsideMenuItemProps>`
  margin: 0;
  min-height: 40px;
  color: ${props => props.theme.primaryTextColor};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 8px;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  margin-bottom: 6px;
  border-radius: 10px;
  transition: background-color .3s;

  &:hover {
    ${props => !props.disabled && !props.active && css`
      color: ${props.theme.linkTextColor};
      background: ${props.theme.menuItemActive};
    `}
  }

  ${props => props.active && css`
    color: ${props => props.theme.linkTextColor};
    background: ${props.theme.menuItemActive};
    svg {
      path {
        fill: ${props.theme.linkTextColor};
      }
    }
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
  padding-bottom: 24px;
`

export const AsideTitle = styled.h2`
  color: ${props => props.theme.additionalTextColor};
  font-size: 11px;
  font-weight: 500;
  margin: 0 0 4px;
  padding: 0 16px;
`

export const AsideTextLink = styled(TextLink)`
  display: flex;
  align-items: center;
`

export const AsideMenuItemExternal = styled.div`
  margin: 0;
  min-height: 40px;
  color: ${props => props.theme.primaryTextColor};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 8px;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  margin-bottom: 6px;
  border-radius: 10px;
  transition: background-color .3s;

  &:hover {
    color: ${props => props.theme.linkTextColor};
    background: ${props => props.theme.menuItemActive};
  }

  .${AsideMenuItemIconClassName} {
    margin-right: 24px;
  }
`
