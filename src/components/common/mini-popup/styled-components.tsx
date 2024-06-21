import styled from 'styled-components'

export const MiniPopupContainerClass = 'MiniPopupContainer'

export const MiniPopupContainer = styled.div`
  padding: 8px 16px;
  border-radius: 16px;
  background: ${props => props.theme.primaryBackgroundColor};
  min-width: 200px;
  position: absolute;
  transform: translateY(calc(100% + 10px));
  bottom: 0;
  z-index: 2;
  right: 0;
  box-shadow: 0px 2px 8px rgba(40, 41, 61, 0.04), 0px 16px 24px rgba(96, 97, 112, 0.16);
`

