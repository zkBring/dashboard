import styled from 'styled-components'
import { Button } from 'components/common'

export const Container = styled.div`
  border-radius: 16px;
  border: 1px solid ${props => props.theme.primaryHighlightColor};
  background-color: ${props => props.theme.noteDefaultBackgroundColor};
  padding: 24px 24px 36px;
  max-width: 358px;
  margin-top: 23px;
`

export const Title = styled.h3`
  font-size: 22px;
  line-height: 28px;
  font-weight: 400;
  color: ${props => props.theme.primaryTextColor};
  margin: 0 0 16px;
`

export const Text = styled.p`
  font-size: 16px;
  line-height: 24px;
  margin: 0;
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
`

export const ButtonStyled = styled(Button)`
  max-width: 100%;
  width: 100%;
  border-color: transparent;
  color: ${props => props.theme.primaryHighlightColor};

  &:hover {
    border-color: transparent;
    color: ${props => props.theme.primaryHighlightColor};
  }
`