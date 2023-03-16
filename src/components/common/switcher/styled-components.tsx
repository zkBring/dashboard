import styled, { css } from "styled-components"

export const SwitcherContainer = styled.ul<{disabled?: boolean}>`
  display: flex;
  padding: 0;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  width: 100%;
  max-width: 600px;
  padding: 4px;

  ${props => props.disabled && css`
    opacity: .6;
    cursor: not-allowed;
  `}
`

export const SwitcherItem = styled.li<{active: boolean, disabled?: boolean}>`
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
    border: 1px solid ${props.theme.primaryHighlightColor};
    color: ${props.theme.primaryHighlightColor};
  `}

  ${props => props.disabled && css`
    cursor: not-allowed;
  `}
`

export const Container = styled.div`
  
`

export const SwitcherTitle = styled.h3`
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 16px;
  margin: 0 0 12px;
  color: ${props => props.theme.primaryTextColor};
`