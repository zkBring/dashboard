import styled, { css } from 'styled-components'
import { TRadioItem } from './types'

export const RadioButtonControllerClassName = 'RadioButtonControllerClassName'

export const RadioButtonsContainer = styled.div`
  
`

export const RadioButtonsLabel = styled.h3`
  margin-bottom: 4px;
  font-weight: 700;
  font-size: 16px;
  margin: 0 0 12px;
  color: ${props => props.theme.primaryTextColor};
`

export const RadioItem = styled.div<TRadioItem>`
  display: flex;
  cursor: pointer;
  margin-bottom: 4px;
  align-items: center;
  min-height: 30px;

  ${props => props.disabled && css`
    cursor: not-allowed;
    opacity: 0.3;
  `}

  .${RadioButtonControllerClassName} {
    &:after {
      background-color: ${props => {
        if (props.active) {
          return props.theme.primaryHighlightColor
        }
        return props.theme.primaryColor
      }}
    }
    
  }
`

export const RadioButtonController = styled.div`
  min-width: 16px;
  min-height: 16px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid ${props => props.theme.primaryBorderColor};

  &:after {
    display: block;
    content: '';
    width: 10px;
    height: 10px;
    background-color: ${props => props.theme.blankColor};
    border-radius: 3px;
  }
`

export const RadioButtonLabel = styled.h4`
  margin: 0 0 0 4px;
  font-weight: 400;
  font-size: 16px;
`