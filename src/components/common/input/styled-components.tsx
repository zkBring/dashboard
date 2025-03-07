import styled, { css } from 'styled-components'
import { InputContainerProps, InputFieldProps, InputTitleProps } from './types'

export const InputContainer = styled.div.attrs((props) => ({
  className: props.className,
}))<InputContainerProps>`
  margin-bottom: 24px;
  box-sizing: border-box;
`

export const InputTitle = styled.h3<InputTitleProps>`
  margin-bottom: 4px;
  font-weight: 400;
  font-size: 16px;
  margin: 0 0 12px;

  color: ${(props) => (props.theme && props.theme.primaryTextColor)};
  ${(props) =>
    props.error &&
    css`
      color: ${(props) => (props.theme && props.theme.dangerTextColor)};
    `}
`

export const InputFieldContainer = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  border-radius: 8px;
  overflow: hidden;
`

export const InputPrefix = styled.div`
  display: flex;
  padding: 13px 16px;
  align-items: center;
  justify-content: cetner;
  border-right: 1px solid ${props => props.theme.primaryBorderColor};
  background-color: ${props => props.theme.inputIconZoneBackgroundColor};
`

export const InputField = styled.input<InputFieldProps>`
  color: ${(props) => (props.theme && props.theme.additionalTextColor)};
  font-size: 14px;
  width: 100%;
  line-height: 20px;
  font-weight: 400;
  padding: 11px 16px;
  border: 1px solid;
  border-radius: 0;
  transition: border-color 0.3s;
  outline: none;
  margin: 0;
  background: transparent;
  border: none;

  ::placeholder {
    color: ${(props) => (props.theme && props.theme.placeholderTextColor)};
  }

  &:focus {
    // focus properties
  }

  ${(props) =>
    props.error &&
    css`
      border-color: ${(props) => (props.theme && props.theme.dangerTextColor)};
      &:focus {
        border-color: ${(props) => (props.theme && props.theme.dangerTextColor)};
        outline: none;
      }
    `}
  
`

export const InputAdditionalText = styled.div<{ type: 'error' | 'note' }>`
  margin-top: 6px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: ${(props) => (props.theme && props.theme.placeholderTextColor)};

  ${(prosp) =>
    prosp.type === 'error' &&
    css`
      color: ${(props) => (props.theme && props.theme.dangerTextColor)};
    `}
`
