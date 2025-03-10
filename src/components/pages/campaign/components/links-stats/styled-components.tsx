import { Widget } from "components/common"
import styled from "styled-components"

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
`

export const Subtitle = styled.h3`
  font-family: 'Inter', Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 26px;
  letter-spacing: 0.1px;
  color: ${props => props.theme.additionalTextColor};
  margin: 0 0 8px;
`

export const Value = styled.p`
  font-family: 'Inter', Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 26px;
  color: ${props => props.theme.primaryTextColor};
  margin: 0;

  display: flex;
  gap: 10px;
  align-items: center;
`

export const WidgetComponent = styled(Widget)`
  padding: 20px;
  border-radius: 10px;
`