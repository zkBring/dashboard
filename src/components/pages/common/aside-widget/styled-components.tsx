import styled, { css } from 'styled-components'
import { MiniPopup, Button } from 'components/common'
import { Loader } from 'linkdrop-ui'
import { TOptionItem } from './types'

export const ButtonStyled = styled(Button)`
`

export const WidgetTitle = styled.h3`
  font-size: 15px;
  margin: 0 0 10px;
  color: ${props => props.theme.primaryTextColor};
`

export const WidgetTitleFlex = styled(WidgetTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const WidgetOptions = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
`

export const MiniPopupContainerStyled = styled(MiniPopup)`
  padding-left: 0;
  padding-right: 0;
`

export const OptionsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const OptionsListItem = styled.li<TOptionItem>`
  padding: 0;
  height: 36px;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;

  svg {
    margin-right: 8px;
  }

  &:hover {
    color: ${props => props.theme.linkTextColor};
  }

  ${props => props.disabled && css`
    color: ${props => props.theme.disabledTextColor};
    cursor: not-allowed;
    svg {
      circle {
        stroke: ${props => props.theme.disabledTextColor};
      }

      path {
        fill: ${props => props.theme.disabledTextColor};
      }

      rect {
        fill: ${props => props.theme.disabledTextColor};
      }
    }
    &:hover {
      color: ${props => props.theme.disabledTextColor};
    }
  `}
`

export const OptionsListBorder = styled.hr`
  border-color: ${props => props.theme.primaryBorderColor};
  border-top: none;
`

export const TitleLoader = styled(Loader)`
  div {
    border-color: ${props => props.theme.primaryHighlightColor} transparent transparent transparent;
  }
`

export const AsideWrapper = styled.div`
  border-radius: 10px;
`