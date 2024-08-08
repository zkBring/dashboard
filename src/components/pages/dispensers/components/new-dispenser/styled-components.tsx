import styled from "styled-components"
import { AsidePopup } from 'components/common'
import {
  Link
} from 'react-router-dom'

export const AsidePopupStyled = styled(AsidePopup)`
  display: grid;
  grid-template-rows: min-content min-content 1fr min-content;
  height: 100vh;
  min-width: 614px;
`

export const DispenserType = styled(Link)`
  display: grid;
  padding: 24px;
  grid-template-columns: 154px 1fr;
  gap: 32px;
  align-items: center;
  text-decoration: none;
  color: ${props => props.theme.primaryTextColor};
`

export const DispenserTitle = styled.h4`
  margin: 0 0 12px;
  font-size: 16px;
  line-height: 24px;
  align-items: center;
  display: flex;
  color: ${props => props.theme.primaryTextColor};
  justify-content: space-between;
`

export const DispenserText = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${props => props.theme.primaryTextColor};
  line-height: 20px;
`

export const DispenserImage = styled.div`
  width: 100%;

  svg {
    max-width: 100%;
    height: auto;
  }
`

export const DispenserContent = styled.div`

`