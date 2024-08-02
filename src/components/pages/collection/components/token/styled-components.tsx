import styled, { css } from "styled-components"
import { Button } from 'components/common'

export const Container = styled.div`
  padding: 24px;
  border-radius: 16px;
  background: ${props => props.theme.primaryBackgroundColor};
`

export const TokenContent = styled.div`
  padding-top: 30px;
`

export const TokenImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
`

export const TokenVideo = styled.video`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
`

export const TokenData = styled.ul`
  font-size: 16px;
  line-height: 24px;
  list-style: none;
  padding: 0;
  color: ${props => props.theme.primaryTextColor}
`

export const TokenControls = styled.div`
  display: flex;
`

// NEW COMPONENTS
export const TokenHeader = styled.div`
  display: grid;
  grid-template-columns: 24px 48px 1fr 120px;
  gap: 12px;
  align-items: center;
`

export const TokenTitle = styled.h4`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin: 0 0 4px;
`

export const TokenAmount = styled.p`
  font-size: 14px;
  line-height: 20px;
  margin: 0;
`


export const TokenHeaderContent = styled.div``

export const TokenProperties = styled.div`
  display: grid;
  grid-template-columns: repeat(4, min-content);
  gap: 16px;
`

export const TokenProperty = styled.div`
  border: 1px solid ${props => props.theme.additionalBorderColor};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  width: 140px;
`

export const TokenPropertyTitle = styled.h5`
  font-size: 12px;
  line-height: 16px;
  margin: 0 0 8px;
  color: ${props => props.theme.additionalTextColor};
`

export const TokenPropertyValue = styled.p`
  font-size: 12px;
  line-height: 16px;
  margin: 0;
  color: ${props => props.theme.primaryTextColor};

`

export const ButtonStyled = styled(Button)`
  max-width: 100%;
  width: 100%;
`

export const TokenDescriptionTitle = styled.h5`
  font-size: 12px;
  line-height: 16px;
  margin: 0 0 8px;
`


export const TokenDescriptionText = styled.p`
  font-size: 14px;
  line-height: 20px;
  margin: 0 0 32px;
`

export const ExpandButton = styled.div<{
  expanded?: boolean,
  disabled?: boolean
}>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform .3s;

  ${props => props.expanded && css`
    transform: rotate(180deg);
  `}

  ${props => props.disabled && css`
    cursor: not-allowed;
    opacity: .3;
  `}
`