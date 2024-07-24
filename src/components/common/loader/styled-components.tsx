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
  ${props => {
    if (props.size === 'large') {
      return css`
        --uib-size: 40px;
        --uib-stroke: 5px;
      `
    } else if (props.size === 'small') {
      return css`
        --uib-size: 16px;
        --uib-stroke: 2px;
      `
    } else {
      return css`
        --uib-size: 24px;
        --uib-stroke: 3px;
      `
    }
  }}
  
  --mask-size: calc(var(--uib-size) / 2 - var(--uib-stroke));
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: var(--uib-size);
  width: var(--uib-size);
  mask: radial-gradient(circle var(--mask-size), transparent 99%, #000 100%);
  background-image: conic-gradient(transparent 25%, ${props => props.theme.primaryHighlightColor});
  animation: ${rotation} .9s linear infinite;
  border-radius: 50%;
`