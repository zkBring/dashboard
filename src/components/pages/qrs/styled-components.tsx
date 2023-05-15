import styled from "styled-components";
import { Input } from 'linkdrop-ui'
import { WidgetTitle, BatchListValue, BatchList, BatchListLabel } from 'components/pages/common'
import { Button } from 'components/common'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

export const ContainerButton = styled(Button)`
  align-self: end;
  margin-bottom: 0px;
`

export const InputComponent = styled(Input)`
`

export const BatchListStyled = styled(BatchList)`
  grid-template-columns: auto auto auto auto auto auto 180px;
  margin-top: 20px; 
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

export const WidgetTitleStyled = styled(WidgetTitle)`
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0;
`

export const BatchListValueStyled = styled(BatchListValue)`
  display: flex;
  justify-content: flex-end;
`

export const BatchListLabelStyled = styled(BatchListLabel)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`
