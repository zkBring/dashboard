import styled, { css } from 'styled-components'

export const SelectStyledClass = 'SelectStyledClass'

export const Container = styled.div`
  width: 100%;
  .${SelectStyledClass} {
    border-color: ${props => props.theme.primaryBorderColor};

    & > div {
      min-height: 42px;
    }
  }
  
`

export const SelectTitle = styled.h3`
  font-weight: 600;
  font-size: 16px;
  margin: 0 0 12px;
  color: ${props => props.theme.primaryTextColor};
`


export const SelectAdditionalText = styled.div`
  margin-top: 6px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.additionalTextColor};
  svg {
    margin-right: 8px;
  }

`

export const SelectNotFound = styled.div<{isNotFoundClickable?: boolean}>`
  text-align: left;
  color: ${props => props.theme.additionalTextColor};
  cursor: not-allowed;
  ${props => props.isNotFoundClickable && css`
    cursor: pointer;
    color: ${props => props.theme.primaryTextColor};
  `}
`
