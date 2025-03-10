import styled, { css } from 'styled-components'

export const SelectStyledClass = 'SelectStyledClass'

export const Container = styled.div`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  .${SelectStyledClass} {
    & > div {
      background: ${(props) => (props.theme && props.theme.widgetColor)};
      min-height: 44px;
      border-radius: 8px;
      border: 1px solid
        ${(props) => (props.theme && props.theme.primaryBorderColor)};



      & > div {
        & > div:first-child {
          // color of NOT chosen items
          font-size: 14px;
          font-family: 'Inter', 'Helvetica Neue', sans-serif;
          font-weight: 400;
          color: ${(props) => (props.theme && props.theme.additionalTextColor)};
        }
        & > div:last-child {
          max-width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
`

export const SelectTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 15px;
  font-weight: 400;
  color: ${(props) => (props.theme && props.theme.primaryTextColor)};
`

export const SelectAdditionalText = styled.div`
  margin-top: 6px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: ${(props) => (props.theme && props.theme.primaryTextColor)};
`

export const SelectNotFound = styled.div<{ isNotFoundClickable?: boolean }>`
  text-align: left;
  color: ${(props) => (props.theme && props.theme.additionalTextColor)};
  cursor: not-allowed;
  ${(props) =>
    props.isNotFoundClickable &&
    css`
      cursor: pointer;
      color: ${(props) => (props.theme && props.theme.primaryTextColor)};
    `}
`
