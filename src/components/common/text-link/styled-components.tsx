import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const TextLink = styled.a`
  display: inline;
  color: ${props => props.theme.primaryHighlightColor};
  transition: color .3s;

  &:active, &:hover, &:visited {
    color: ${props => props.theme.buttonActionBackgroundHoverColor};
  }
`

export const TextRouterLink = styled(Link)`
  color: ${props => props.theme.primaryHighlightColor};
  text-decoration: none;

  &:active, &:hover, &:visited {
    color: ${props => props.theme.buttonActionBackgroundHoverColor};
  }
`

export const TextButton = styled.span`
  display: inline;
  text-decoration: none;
  cursor: pointer;
  color: ${props => props.theme.primaryHighlightColor};

  &:active, &:hover, &:visited {
    color: ${props => props.theme.buttonActionBackgroundHoverColor};
  }
`