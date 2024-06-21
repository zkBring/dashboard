import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom'
import Icons from 'icons'

type THeaderProps = {
  breadcrumbs: boolean
}

export const Header = styled.div<THeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  padding: 0 20px;
  height: 80px;
  ${props => props.breadcrumbs && css`
    height: 116px;
  `}
`;

export const HeaderTitle = styled.h2`
  color: ${props => props.theme.primaryTextColor};
  font-size: 28px;
  flex: 1;
  font-weight: 600;
  min-height: 34px;
`

export const HeaderMode = styled.div`
  margin-right: 16px;
  padding-right: 16px;
  border-right: 1px solid ${props => props.theme.primaryBorderColor};
  line-height: 20px;
  font-size: 14px;
`

export const HeaderLogoLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: ${props => props.theme.primaryTextColor};
`

export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderUserInfo = styled.div<{ onClick?: () => void }>`
  display: flex;
  align-items: center;
  font-size: 14px;
  min-width: 152px;
  border-radius: 36px;
  font-weight: 500;
  padding: 0;
  min-height: 36px;
  position: relative;
  text-align: center;
  user-select: none;
  background: ${props => props.theme.primaryBackgroundColor};
  justify-content: center;
  margin-right: 16px;
  border: 1px solid ${props => props.theme.primaryBorderColor};

  ${props => props.onClick && css`
    cursor: pointer;
  `}

  &:last-child {
    margin-right: 0px;
  }
`

export const HeaderUserInfoPadded = styled(HeaderUserInfo)`
  padding: 0 0 0 24px;
`

export const HeaderUserInfoAddress = styled.div`
  height: 28px;
  border-radius: 36px;
  margin-left: 16px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  background: ${props => props.theme.additionalBackgroundColor};
`

export const HeaderNetworkIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 100%;
  background: #FFF;
`
export const HeaderNetworkIconImg = styled.img`

`

export const NetworkIndicatorClass = 'NetworkIndicatorClass'

export const MiniPopupCustomItem = styled.div`
  font-size: 12px;
  margin-bottom: 8px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  &:last-child {
    margin-bottom: 0px;
  }

  :hover {
    .${NetworkIndicatorClass} {
      background-color: ${props => props.theme.tagDefaultColor};
    }
  }
`

type TNetworkIndicatorProps = {
  selected: boolean
}

export const NetworkIndicator = styled.div<TNetworkIndicatorProps>`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: transparent;
  ${props => props.selected && css`
    background-color: ${props => props.theme.primaryHighlightColor}!important;
  `}
`

export const PolygonIcon = styled(Icons.PolygonIcon)`
  margin-right: 8px;
`

export const Logout = styled.div`
  border-radius: 36px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  background: ${props => props.theme.primaryBackgroundColor};
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .3s;
  svg {
    path {
      stroke: ${props => props.theme.primaryTextColor};
    }
  }
  &:hover {
    ${props => {
      return css`
        border-color: transparent;
        background-color: ${props => props.theme.tagDefaultColor};
      `
    }};
  }
`