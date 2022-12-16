import styled, { css } from 'styled-components';
import Loader from '../loader'
import { Link } from 'react-router-dom'
import { TProps } from './types'

export const ButtonLink = styled(Link)`
  text-decoration: none;
`

export const Anchor = styled.a`
  text-decoration: none;
`

export const ButtonLoader = styled(Loader)`
  margin-right: 8px;
`

export const Button = styled.button.attrs(props => ({
  className: props.className
}))<TProps>`
  cursor: pointer;
  padding: 8px 20px;
  font-size: 14px;
  height: 40px;
  line-height: 1;
  display: flex;
  align-items: center;
  font-weight: 400;
  justify-content: center;
  border-radius: 100px;
  //default
  transition: color .3s, background-color .3s, border-color .3s;
  background-color: ${props => props.theme.buttonDefaultBackgroundColor};
  color: ${props => props.theme.primaryTextColor};
  border: 1px solid;
  border-color: ${props => props.theme.primaryBorderColor};
  
  ${props => !props.disabled && css`
    &:hover {
      border-color: ${props.theme.extraBorderColor};
      background-color: ${props.theme.buttonDefaultBackgroundHoverColor};
    }
    &:active {
      border-color: ${props.theme.extraBorderColor};
      background-color: ${props.theme.primaryTextColor};
      color: ${props.theme.secondaryTextColor};
    }
  `}

  ${props => props.size === 'small' && css`
    padding: 4px 8px;
    height: 24px;
    border-radius: 8px;
    min-width: 74px;
  `}

  ${props => props.disabled && css`
    border-color: ${props => props.theme.disabledBorderColor};
    color: ${props => props.theme.disabledTextColor};
  `}
  

  // action
  ${props => props.appearance === 'action' && css`
    border: none; 
    background-color: ${props => props.theme.buttonActionBackgroundColor};
    color: ${props => props.theme.secondaryTextColor};
    
    ${!props.disabled && css`
      &:hover {
        background-color: ${props.theme.secondaryHighlightColor};
      }
      &:active {
        background-color: ${props.theme.buttonActionBackgroundColor};
      } 
    `}

    ${props.disabled && css`
      background-color: ${props.theme.disabledColor};
      color: ${props => props.theme.disabledTextColor};
    `}
  `}

  ${props => props.appearance === 'additional' && css`
    border: none; 
    background-color: ${props => props.theme.buttonAdditionalBackgroundColor};
    color: ${props => props.theme.primaryHighlightColor};

    ${!props.disabled && css`
      &:hover {
        opacity: .8;
        background-color: ${props => props.theme.buttonAdditionalBackgroundColor};
        color: ${props => props.theme.primaryHighlightColor};
      }
      &:active {
        opacity: .8;
        background-color: ${props => props.theme.buttonAdditionalBackgroundColor};
        color: ${props => props.theme.primaryHighlightColor};
      } 
    `}

    ${props.disabled && css`
      background-color: ${props.theme.disabledColor};
      color: ${props => props.theme.disabledTextColor};
    `}
  `}


  // inverted-bordered
  ${props => props.appearance === 'default-inverted' && css`
    background-color: ${props.theme.buttonDefaultBackgroundColor};
    border-color: ${props.theme.secondaryBorderColor};
    color: ${props.theme.secondaryTextColor};
    ${!props.disabled && css`
      &:hover {
        background-color: ${props.theme.blankColor};
        border-color: ${props.theme.secondaryBorderColor};
        color: ${props.theme.secondaryHighlightColor};
      }
      &:active {
        background-color: ${props.theme.blankColor};
        border-color: ${props.theme.secondaryBorderColor};
        color: ${props.theme.secondaryHighlightColor};
      }
    `}
  `}


  // gradient
  

  ${props => props.appearance === 'action-inverted' && css`
    ${props.disabled && css`
      background-color: transparent;
      border-color: ${props.theme.buttonDisabledColor};
      color: ${props.theme.buttonDisabledTextColor};
    `}
    ${!props.disabled && css`
      &:hover {
        border-color: ${props.theme.buttonHoverColor};
        color: ${props.theme.buttonHoverColor};
      }
      &:active {
        border-color: ${props.theme.buttonActiveColor};
        color: ${props.theme.buttonActiveColor};
        transform: scale(1.01);
      }
    `}
  `}

  ${props => props.loading && css`
    background: ${props => props.theme.buttonGradient};
    background-size: 200%;
    background-position: left top;
    transition: background-position .3s, transform .3s;
    border: none;
    color: ${props => props.theme.secondaryTextColor};

    ${!props.disabled && css`
      &:hover {
        background-position: right top;
      }
      &:active {
        background-position: center center;
        transform: scale(1.01);
      }
    `}
  `}

  ${props => props.disabled && css`
    cursor: not-allowed;
  `}
`;


