import styled, { css } from 'styled-components';

interface InputContainerProps {
  disabled: boolean,
  error?: string,
  className?: string
}

interface InputFieldProps {
  value: string,
  error?: string
}

interface InputTitleProps {
  error?: string
}

export const InputContainer = styled.div.attrs(props => ({
  className: props.className
}))<InputContainerProps>`
  margin-bottom: 24px;
`

export const InputTitle = styled.h3<InputTitleProps>`
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 16px;
  margin: 0 0 12px;
  color: ${props => props.theme.primaryTextColor};
  ${props => props.error && css`
    color: ${props => props.theme.dangerTextColor};
  `}
`

export const InputField = styled.input<InputFieldProps>`
  color: ${props => props.theme.primaryTextColor};
  font-size: 14px;
  width: 100%;
  line-height: 1;
  padding: 12px 16px;
  border: 1px solid;
  border-color: ${props => props.theme.primaryBorderColor};
  border-radius: 8px;
  transition: border-color .3s;
  outline: none;

  &:focus {
    border-color: ${props => props.theme.primaryHighlightColor};
    outline: none;
  }

  ${props => props.error && css`
    border-color: ${props => props.theme.dangerTextColor};
    &:focus {
      border-color: ${props => props.theme.dangerTextColor};
      outline: none;
    }
  `}
`

export const InputAdditionalText = styled.div<{ type: 'error' | 'note'}>`
  margin-top: 6px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.additionalTextColor};
  svg {
    margin-right: 8px;
  }

  ${prosp => prosp.type === 'error' && css`
    color: ${props => props.theme.dangerTextColor};
    svg {
      rect {
        fill: ${props => props.theme.dangerTextColor};
      }
      path {
        stroke: ${props => props.theme.dangerTextColor};
      }
    }
  `}
`
