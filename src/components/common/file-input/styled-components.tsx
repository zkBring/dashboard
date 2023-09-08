import styled from "styled-components"
import { Input } from 'linkdrop-ui'
import { Button } from 'components/common'

export const InputComponent = styled(Input)`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin-bottom: 0;
  z-index: 2;

  input {
    padding-left: 100%;
    cursor: pointer;
  }
`


export const InputContainer = styled.div`
  height: 42px;
  margin-bottom: 10px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  border-radius: 8px;
  width: 100%;
  padding: 0 120px 0 12px;
  overflow:hidden;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`

export const InputFileName = styled.span`
  color: ${props => props.theme.primaryHighlightColor};
  line-height: 40px;
  font-size: 14px;
`

export const ButtonStyled = styled(Button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
  z-index: 1;
`