import styled from "styled-components";
import {
  Button,
  Input
} from 'components/common'

import {
  BatchList
} from 'components/pages/common'


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

export const ContainerButton = styled(Button)`
  align-self: end;
  margin-bottom: 20px;
`

export const InputComponent = styled(Input)`
`

export const BatchListStyled = styled(BatchList)`
  grid-template-columns: auto auto auto auto auto 180px;
`