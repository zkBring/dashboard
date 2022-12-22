import styled from "styled-components"

export const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .3);
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
`

export const Popup = styled.div`
  max-width: 500px;
  position: relative;
  width: 100%;
  background: ${props => props.theme.backgroundColor};
  border-radius: 8px;
  padding: 20px;
`

export const PopupTitle = styled.h3`
  margin: 0 0 14px;
  font-size: 22px;
  font-weight: 600;
  padding-right: 30px;
`

export const CloseButton = styled.div`
  position: absolute;
  right: 20px;
  cursor: pointer;
  top: 20px;
`

