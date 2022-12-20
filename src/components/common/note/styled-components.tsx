import styled from "styled-components"

export const NoteWrapper = styled.div`
  background: ${props => props.theme.noteDefaultBackgroundColor};
  border: 1px solid ${props => props.theme.primaryHighlightColor};
  padding: 18px 20px;
  color: ${props => props.theme.primaryHighlightColor};
  position: relative;
  border-radius: 16px;
  margin-bottom: 30px;
  font-size: 14px;;
`