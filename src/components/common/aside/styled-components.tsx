import styled, { css } from 'styled-components';
import TextLink from '../text-link'
import Button from '../button'
import { Link } from 'react-router-dom'

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 208px;
  background-color: ${props => props.theme.backgroundColor};
`

export const AsideLogoZone = styled.div<{ noAside: boolean }>`
  display: flex;
  align-items: center;
  padding: 28px 12px;

  ${props => props.noAside && css`{
    position: absolute;
  }`}
`

export const AsideLogoIcon = styled.img`
  width: 32px;
  margin-right: 10px;
`

export const AsideLogoText = styled.h4`
  font-size: 12px;
  font-weight: 600;
  margin: 0;
  color: ${props => props.theme.primaryTextColor};
`

export const AsideSubtitle = styled.h3`
  margin: 0 0 4px;
  padding: 0 16px;
  color: ${props => props.theme.additionalTextColor};
`

export const AsideMenu = styled.ul`
  margin: 0;
  padding: 0 12px 0 16px;
  list-style: none;
  width: 100%;
  margin-bottom: 60px;
`

interface AsideMenuItemProps {
  active: boolean;
  disabled: boolean;
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

  svg {
    margin-right: 8px;
  }

  &:hover {
    ${props => !props.disabled && !props.active && css`
      color: ${props.theme.linkTextColor};
      background: ${props.theme.menuItemActive};
    `}
    svg {
      path {
        stroke: ${props => props.theme.linkTextColor};
      }
    }
  }

  ${props => props.active && css`
    color: ${props => props.theme.linkTextColor};
    background: ${props.theme.menuItemActive};
    svg {
      path {
        stroke: ${props.theme.linkTextColor};
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
`

export const AsideTitle = styled.h2`
  color: ${props => props.theme.primaryTextColor};
  font-size: 26px;
  flex: 1;
  display: flex;
  font-weight: 500;
  align-items: center;
  margin: 0;
`

export const AsideTextLink = styled(TextLink)`
  display: flex;
  align-items: center;
`

export const FooterMenu = styled.div`
  padding: 20px 32px;
  padding: 0px 16px 36px;
`

export const FooterButton = styled(Button)`
  margin-bottom: 14px;
  width: 100%;

  &:last-child {
    margin-bottom: 0px;
  }
`