import styled, { css } from "styled-components"

export const TabsWrapper = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 24px;
`

export const Tab = styled.li<{
  active: boolean
}>`
  margin: 0;
  padding: 0;
  font-size: 16px;
  cursor: pointer;
  line-height: 24px;
  border-bottom: 2px solid transparent;

  ${props => props.active && css`
    border-color: ${props.theme.primaryHighlightColor};
  `}

  &:hover {
    border-color: ${props => props.theme.primaryHighlightColor};
  }
`