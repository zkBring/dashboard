import styled from 'styled-components'

export const ProgressBarContainer = styled.div`
  max-width: 500px;
  height: 8px;
  border-radius: 24px;
  position: relative;
  background: ${props => props.theme.primaryBorderColor};
`

export const Bar = styled.div`
  position: absolute;
  top: 0;
  background: ${props => props.theme.primaryHighlightColor};
  left: 0;
  border-radius: 24px;
  height: 100%;
`