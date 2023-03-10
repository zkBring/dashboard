import styled, { css } from "styled-components"

export const SwitcherContainer = styled.ul`
  display: flex;
  padding: 0;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  width: 100%;
  max-width: 600px;
  padding: 4px;
`

export const SwitcherItem = styled.li<{active: boolean}>`
  flex: 1;
  margin: 0;
  border-radius: 8px;
  height: 40px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.primaryTextColor};
  transition: all .3s;
  font-size: 14px;

  ${props => props.active && css`
    background: ${props.theme.noteDefaultBackgroundColor};
    border: ${props.theme.primaryHighlightColor};
    color: ${props.theme.primaryHighlightColor};
  `}
`