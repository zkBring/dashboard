import styled, { css } from 'styled-components'
import { TStatus } from 'types'

export const TagContainer = styled.div<{ status: TStatus }>`
  padding: 4px 8px;
  display: inline-block;
  border-radius: 8px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  ${props => props.status === 'error' && css`
    background-color: ${props.theme.tagErrorBackgroundColor};
    color: ${props.theme.primaryTextColor};
    border: 1px solid ${props.theme.tagErrorBorderColor}
  `}

  ${props => props.status === 'default' && css`
    background-color: ${props.theme.tagDefaultBackgroundColor};
    color: ${props.theme.primaryTextColor};
    border: 1px solid ${props.theme.tagDefaultBorderColor}
  `}

  ${props => props.status === 'info' && css`
    background-color: ${props.theme.tagInfoBackgroundColor};
    color: ${props.theme.primaryTextColor};
    border: 1px solid ${props.theme.tagInfoBorderColor}
  `}

  ${props => props.status === 'success' && css`
    background-color: ${props.theme.tagSuccessBackgroundColor};
    color: ${props.theme.primaryTextColor};
    border: 1px solid ${props.theme.tagSuccessBorderColor}
  `}
`