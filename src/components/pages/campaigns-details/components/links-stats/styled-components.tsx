import styled from "styled-components"

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`

export const Subtitle = styled.h3`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.1px;
  color: ${props => props.theme.additionalTextColor};
  margin: 0 0 4px;
`

export const Value = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;
  color: ${props => props.theme.primaryTextColor};
  margin: 0;
`

