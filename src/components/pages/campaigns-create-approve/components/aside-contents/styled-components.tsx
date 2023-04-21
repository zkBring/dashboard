import styled from 'styled-components'
import Icons from 'icons'
import { Loader, Note } from 'linkdrop-ui'

export const AsideNote = styled.div`
  color: ${props => props.theme.primaryHighlightColor};
  font-size: 14px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const ApprovedIcon = styled(Icons.ApprovedIcon)`
  margin-right: 4px; 
`

export const LoaderStyled = styled(Loader)`
  margin-right: 4px;
  div {
    border-color: ${props => props.theme.primaryHighlightColor} transparent transparent transparent;
  }
`

export const NoteStyled = styled(Note)`
  margin-top: 22px;
`