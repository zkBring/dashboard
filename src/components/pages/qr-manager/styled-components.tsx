import styled from "styled-components"
import { Button } from 'components/common'

export const Container = styled.div`
  display: grid;
  max-width: 1116px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`

export const Card = styled.div`
  padding: 24px;
  border-radius: 16px;
  background: ${props => props.theme.backgroundColor};
`

export const CardTitle = styled.h3`
  font-size: 22px;
  font-weight: 500;
  line-height: 28px;
  margin: 0 0 12px;
`

export const CardText = styled.p`
  font-size: 16px;
  line-height: 24px;
  margin: 0 0 32px;
`

export const ButtonStyled = styled(Button)`
  width: 100%;
`

export const Image = styled.img`
  max-width: 308px;
  display: block;
  margin-bottom: 32px;
`

