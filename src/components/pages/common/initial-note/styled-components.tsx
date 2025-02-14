import styled from "styled-components"
import { Button } from 'components/common'

export const Container = styled.div`
  max-width: 374px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
`

export const Image = styled.div`
  max-width: 280px;
  margin: 0 auto 76px;
`

export const Title = styled.h2`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  margin: 0 0 12px;
`

export const Text = styled.p`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  margin: 0 0 32px;
`

export const ButtonStyled = styled(Button)`

`