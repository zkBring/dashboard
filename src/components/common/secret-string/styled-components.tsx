import styled, { css } from "styled-components"
import { TContainer } from './types'

export const Container = styled.span<TContainer>`
  display: flex;
  align-items: center;
  height: 20px;
  line-height: 1;
  

  ${props => !props.visible && css`
      font-size: 6px;
  `}
  
`

export const IconStyled = styled.div`
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  user-select: none;
`