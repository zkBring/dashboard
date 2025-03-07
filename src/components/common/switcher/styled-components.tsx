import styled, { css, keyframes } from 'styled-components'
import Loader from '../loader'

export const SwitcherLoader = styled(Loader)`
  margin-right: 8px;
`
const backgroundAnimation = keyframes`
  0% { background-position: left top; }
  50% { background-position: right bottom; }
  100% { background-position: left top; }
`

export const SwitcherContainer = styled.ul<{ disabled?: boolean }>`
  display: flex;
  padding: 0;
  border-radius: 8px;
  margin: 0;
  box-sizing: border-box;
  border: 1px solid ${(props) => (props.theme && props.theme.primaryBorderColor)};
  width: 100%;
  max-width: 600px;
  padding: 4px;

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}
`

export const SwitcherItem = styled.li<{
  active: boolean
  disabled?: boolean
  loading?: boolean
}>`
  flex: 1;
  margin: 0;
  border-radius: 8px;
  height: 40px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.theme && props.theme.primaryTextColor)};
  transition: all 0.3s;
  font-size: 14px;

  ${(props) =>
    props.active &&
    css`
      background-color: ${props => props.theme.switcherItemBackgroundColor};
    `}

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
      opacity: .3;
    `}

  ${(props) =>
    props.loading &&
    css`
      background: ${(props) => (props.theme && props.theme.buttonGradient)};
      background-size: 200%;
      border: none;
      background-position: left top;
      transition: background-position 0.3s, transform 0.3s;
      color: ${(props) => (props.theme && props.theme.secondaryTextColor)};
      animation-name: ${backgroundAnimation};
      animation-duration: 10s;
      animation-iteration-count: infinite;
    `}
`

export const Container = styled.div``

export const SwitcherTitle = styled.h3`
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 16px;
  margin: 0 0 12px;
  color: ${(props) => (props.theme && props.theme.primaryTextColor)};
`
