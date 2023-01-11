import styled from "styled-components"
import Icons from "icons"

export const NoteWrapper = styled.div`
  background: ${props => props.theme.noteDefaultBackgroundColor};
  border: 1px solid ${props => props.theme.primaryHighlightColor};
  padding: 18px 20px 18px 40px;
  color: ${props => props.theme.primaryHighlightColor};
  position: relative;
  border-radius: 16px;
  margin-bottom: 30px;
  font-size: 14px;
`

export const IconStyled = styled(Icons.AttentionIcon)`
  position: absolute;
  top: 20px;
  left: 16px;
`


export const NoteTitle = styled.h3`
  color: ${props => props.theme.primaryHighlightColor};
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 10px;
`