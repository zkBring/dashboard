import styled, { css } from 'styled-components'
import { TBreadCrubItem } from './types'

export const BreadcrumbsWrapper = styled.div`
  display: flex;
  align-items: start;
  margin: 18px 0 0;
`

export const BreadcrumbsItem = styled.div<TBreadCrubItem>`
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: ${props => props.theme.additionalTextColor};

  ${props => props.status === 'current' && css`
    color: ${props => props.theme.primaryHighlightColor};
  `}

  ${props => props.status === 'done' && css`
    color: ${props => props.theme.primaryTextColor};
  `}

  ${props => !props.status && css`
    color: ${props => props.theme.additionalTextColor};
  `}

  svg {
    margin: 0 16px;
  }

  
`