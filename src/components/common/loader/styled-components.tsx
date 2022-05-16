import styled, { keyframes, css } from 'styled-components'

const pulse = keyframes`
  0% {
    transform: scale(0.6);
    opacity: 0;
  }
  33% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
`

interface LoaderProps {
  size: 'default' | 'large' | 'small'
}

export const Loader = styled.div<LoaderProps>`
  border-radius: 80px;
  line-height: 100px;
  position: relative;
  text-align: center;
  width: 100px;
  height: 100px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  width: 80px;
  height: 80px;

  ${props  => props.size === 'large' && css`
    width: 140px;
    height: 140px;
    border-radius: 140px;
  `}

  ${props  => props.size === 'small' && css`
    width: 30px;
    height: 30px;
    border-radius: 30px;
  `}

  &:before,
  &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 1);
      border-radius: 50px;
      opacity: 0;
    }
    
    &:before {
    transform: scale(1);
    animation: ${pulse} 2s infinite linear;
  }
    
  &:after {
    animation: ${pulse} 2s 1s infinite linear;
  }


`


export const LoaderOverlay = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  background-color: rgba(255, 255, 255, .7);
`
