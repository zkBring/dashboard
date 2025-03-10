import {
  Button
} from "components/common"
import {
  Toggle
} from 'linkdrop-ui'
import styled from "styled-components"


export const Container = styled.div`
  border-radius: 10px;
  height: 52px;
  padding: 11px;
  position: relative;
  background-color: ${props => props.theme.tokenCounterBackgroundColor};
  display: grid;
  grid-template-columns: min-content 1fr max-content;
  align-items: center;
  overflow: hidden;
`

export const AmountBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: ${props => props.theme.tokenCounterBackgroundFilledColor};
`


export const Value = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 26px;
  color: ${props => props.theme.primaryTextColor};
  margin: 0 0 0 10px;
`

export const ValueLimit = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 26px;
  color: ${props => props.theme.secondaryTextColor};
  margin: 0;
`

export const TokenImage = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  border-radius: 32px;
  background-color: ${props => props.theme.primaryBackgroundColor};
`

export const ButtonStyled = styled(Button)`

`

export const Texts = styled.div`
  display: flex;
`

export const ToggleStyled = styled(Toggle)`
  align-items: center;
  flex-direction: row-reverse;

  h4 {
    font-size: 13px;
    font-weight: 400;
    margin: 0 14px 0 0;
    line-height: 1;
  }
`