import styled from 'styled-components'

export const Code = styled.pre`
  padding: 16px;
  background-color: ${props => props.theme.additionalBackgroundColor};
  border-radius: 8px;
  display: block;
  max-height: 185px;
  overflow: scroll;
`