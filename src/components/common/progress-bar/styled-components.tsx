import styled from 'styled-components'

export const ProgressBarContainer = styled.div`
  max-width: 500px;
  height: 40px;
  border-radius: 5px;
  position: relative;
  border: 1px solid ${props => props.theme.primaryBorderColor};
`

export const Bar = styled.div`
  position: absolute;
  top: 0;
  background: ${props => props.theme.primaryHighlightColor};
  left: 0;
  height: 100%;
`

export const Data = styled.div`
  position: absolute;
  right: 15px;
  top: 0;
  display: flex;
  color: ${props => props.theme.primaryTextColor};
  text-align: left;
  align-items: center;
  height: 100%;
`