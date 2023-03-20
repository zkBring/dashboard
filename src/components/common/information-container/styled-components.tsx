import styled from "styled-components"
import { TextLink } from 'components/common'

export const Container = styled.div`
  background-color: ${props => props.theme.noteDefaultBackgroundColor};
  border-radius: 16px;
  width: 100%;
  padding: 16px;
  position: relative;
`


export const Title = styled.h3`
  color: ${props => props.theme.primaryTextColor};
  margin: 0 0 16px;
`

export const Content = styled.div`
  
`

export const CloseButton = styled.div`
  position: absolute;
  top: 18px;
  right: 16px;
  cursor: pointer;
`

export const ContentItem = styled.div`
  margin-bottom: 28px;

  &:last-child {
    margin-bottom: 0px;
  }
`

export const ContentItemText = styled.p`
  font-size: 16px;
  line-height: 24px;
  margin: 0;
`

export const ContentItemLink = styled(TextLink)`
  font-size: 16px;
`