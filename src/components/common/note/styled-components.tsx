import styled, { css } from "styled-components"
import Icons from "icons"
import TProps from "./types"

export const NoteWrapper = styled.div<TProps>`
  background: ${props => props.theme.noteDefaultBackgroundColor};
  border: 1px solid ${props => props.theme.primaryHighlightColor};
  color: ${props => props.theme.primaryHighlightColor};
  padding: 18px 20px 18px 40px;
  position: relative;
  border-radius: 8px;
  margin-bottom: 30px;
  font-size: 14px;
  ${props => props.type === 'warning' && css`
    background: ${props => props.theme.noteWarningBackgroundColor};
    border: 1px solid ${props => props.theme.noteWarningTextColor};
    color: ${props => props.theme.noteWarningBorderColor};
  `}
`

export const IconStyled = styled(Icons.AttentionIcon)`
  position: absolute;
  top: 20px;
  left: 16px;

  ${props => props.type === 'warning' && css`
    circle:first-child {
      stroke: ${props => props.theme.noteWarningBorderColor}
    }
    circle:nth-child(2) {
      fill: ${props => props.theme.noteWarningBorderColor}
    }
    rect {
      fill: ${props => props.theme.noteWarningBorderColor}
    }
  `}
`

export const NoteTitle = styled.h3`
  color: ${props => props.theme.primaryHighlightColor};
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 10px;
`