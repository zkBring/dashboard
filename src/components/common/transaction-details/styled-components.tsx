import styled, { keyframes } from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  width: 245px;
  margin: 0 auto;
`

const cursorMove = keyframes`
{
    0% {
      bottom: 0px;
      right: 0px;
    }

    50% {
      bottom: 20px;
      right: 20px;
    }

    100% {
      bottom: 0px;
      right: 0px;
    }
  }
`

export const Title = styled.h3`
  position: absolute;
  top: 146px;
  display: flex;
  align-items: center;
  left: 50%;
  font-size: 28px;
  transform: translateX(-50%);

  svg {
    margin-right: 10px;
  }
`

export const Arrow = styled.div`
  position: absolute;
  bottom: 0px;
  animation: ${cursorMove} infinite 3s;
  right: calc(50%);
`

export const TransactionDetailsImage = styled.img`
  max-width: 245px;
`