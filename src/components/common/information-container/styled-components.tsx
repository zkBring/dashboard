import styled from "styled-components"

export const Container = styled.div`
  background-color: ${props => props.theme.tagInfoBackgroundColor};
  border-radius: 8px;
  width: 100%;
  padding: 12px;
  position: relative;
  border: 1px solid ${props => props.theme.tagInfoBorderColor};
`

export const Title = styled.h3`
  color: ${props => props.theme.primaryTextColor};
  margin: 0 0 16px;
`

export const Content = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
`

export const CloseButton = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
`
