import styled from "styled-components"
import { Select } from "linkdrop-ui"

export const SelectWrapper = styled.div`
  h3 {
    margin: 0 0 10px;
    font-size: 15px;
    font-weight: 500;
  }
`

export const SelectStyled = styled(Select)`
  & > div {
    background: ${props => props.theme.blankColor};;

    div:first-child {
      div:first-child {
        color: ${props => props.theme.primaryTextColor};
      }
    }
  }
  
`