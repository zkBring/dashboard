import styled from "styled-components";
import {
  Button,
  Input
} from 'components/common'
import { WidgetTitle } from 'components/pages/common'

import {
  BatchList
} from 'components/pages/common'


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 740px;
`

export const ContainerButton = styled(Button)`
  align-self: end;
  margin-bottom: 20px;
`

export const InputComponent = styled(Input)`
`

export const Buttons = styled.div`
  display: flex;
  justify-content: end;

  & > button {
    margin-left: 16px;
  }
`