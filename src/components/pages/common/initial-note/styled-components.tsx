import styled from "styled-components"
import { Button } from 'components/common'

export const Container = styled.div`
  max-width: 300px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
`

export const Image = styled.img`
  max-width: 85px;
  margin: 0 auto 20px;
`

export const Title = styled.h2`
  font-weight: 400;
  font-family: FKRasterRoman, sans-serif;
  font-size: 50px;
  line-height: 1;
  text-align: center;
  margin: 0 0 40px;
`

export const Text = styled.p`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  margin: 0 0 30px;
`

export const ButtonStyled = styled(Button)`

`