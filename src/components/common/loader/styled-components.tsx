import styled, { keyframes, css } from 'styled-components'

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

interface LoaderProps {
  size: 'default' | 'large' | 'small'
}

export const Loader = styled.div<LoaderProps>`
  font-size: 10px;
  margin: 0px auto;
  text-indent: -9999em;
  border-radius: 50%;
  background: ${props => css`linear-gradient(to right, ${props.theme.primaryHighlightColor} 10%, ${props.theme.blankColor} 82%)`};
  position: relative;
  animation: ${rotation} 1.4s infinite linear;
  transform: translateZ(0);

  ${props => props.size === 'default' && css`
     width: 48px;
     height: 48px;
  `}

  ${props => props.size === 'small' && css`
     width: 20px;
     height: 20px;
     margin: 0 10px 0 0;
  `}

  ${props => props.size === 'large' && css`
     width: 80px;
     height: 80px;
  `}

  &:before {
    width: 50%;
    height: 50%;
    background: ${props => props.theme.primaryHighlightColor};
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }

  &:after {
    background: ${props => props.theme.backgroundColor};
    width: 85%;
    height: 85%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`