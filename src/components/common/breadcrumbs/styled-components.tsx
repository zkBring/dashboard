import styled, { css } from 'styled-components'
import { TBreadCrubItem } from './types'

export const BreadcrumbsWrapper = styled.ol`
  margin: 0;
  display: grid;
  gap: 10px;
  padding-left: 18px;
`

export const BreadcrumbsItem = styled.li<TBreadCrubItem>`
  font-size: 15px;
  color: ${props => props.theme.secondaryTextColor};

  ${props => props.status === 'current' && css`
    color: ${props => props.theme.primaryTextColor};
  `}

  ${props => props.status === 'done' && css`
    color: ${props => props.theme.secondaryTextColor};
  `}

  ${props => !props.status && css`
    color: ${props => props.theme.secondaryTextColor};
  `}
`