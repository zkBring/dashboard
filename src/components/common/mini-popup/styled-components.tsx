import styled from 'styled-components'

export const MiniPopupContainerClass = 'MiniPopupContainer'

export const MiniPopupContainer = styled.div`
  padding: 16px 0px;
  border-radius: 16px;
  background: ${props => props.theme.primaryBackgroundColor};
  min-width: 210px;
  position: absolute;
  transform: translateY(calc(100% + 10px));
  bottom: 0;
  z-index: 200;
  right: 0;
  border: 1px solid ${props => props.theme.primaryBorderColor};
`

