import styled from 'styled-components'

export const MiniPopupContainerClass = 'MiniPopupContainer'

export const MiniPopupContainer = styled.div`
  &.${MiniPopupContainerClass} {
    padding: 8px 16px;
    border: 1px solid ${props => props.theme.primaryBorderColor};
    border-radius: 20px;
    background: ${props => props.theme.backgroundColor};
    min-width: 152px;
    position: absolute;
    transform: translateY(calc(100% + 10px));
    bottom: 0;
    z-index: 2;
    right: 0;
  }
`