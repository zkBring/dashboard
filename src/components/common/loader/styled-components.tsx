import styled, { keyframes, css } from 'styled-components'

const pulse = keyframes`
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

export const LoaderContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 14px;
  height: 14px;
`

export const LoaderSegment1 = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 12px;
  height: 12px;
  margin: 1px;
  border: 2px solid #fff;
  border-radius: 50%;
  animation: ${pulse} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
`

export const LoaderSegment2 = styled(LoaderSegment1)`
  animation-delay: -0.45s;
`

export const LoaderSegment3 = styled(LoaderSegment1)`
  animation-delay: -0.3s;
`

export const LoaderSegment4 = styled(LoaderSegment1)`
  animation-delay: -0.15s;
`
