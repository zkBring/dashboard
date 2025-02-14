import { Widget } from "components/common"
import styled from "styled-components"

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 30px;
`

export const Subtitle = styled.h3`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.1px;
  color: ${props => props.theme.additionalTextColor};
  margin: 0 0 4px;
`

export const Value = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 40px;
  color: ${props => props.theme.primaryTextColor};
  margin: 0;
`

export const WidgetComponent = styled(Widget)`
  padding: 24px;
`