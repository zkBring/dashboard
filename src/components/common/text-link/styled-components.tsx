import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const TextLink = styled.a`
  display: inline;
  text-decoration: none;
  color: ${props => props.theme.primaryHighlightColor};

  &:active, &:hover, &:visited {
    color: ${props => props.theme.primaryHighlightColor};
  }
`

export const TextRouterLink = styled(Link)`
  color: ${props => props.theme.primaryHighlightColor};
  text-decoration: none;

  &:active, &:hover, &:visited {
    color: ${props => props.theme.primaryHighlightColor};
  }
`