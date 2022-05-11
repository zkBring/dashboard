import styled from 'styled-components'

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: fit-content;
`

export const CheckboxInput = styled.input`
  border-radius: 3px;
  width: 20px;
  position: relative;
  height: 20px;

  &:checked {
    &:before {
      border-radius: 3px;
      width: 20px;
      position: relative;
      height: 20px;
      border: 1px solid ${props => props.theme.extraBorderColor};
    }
  }
`

export const CheckboxLabel = styled.h3`
  margin: 0 0 0 4px;
  font-weight: 400;
  font-size: 16px;
`