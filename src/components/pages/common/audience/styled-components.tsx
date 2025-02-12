import styled, { css } from "styled-components"

export const Audience = styled.div`
  display: flex;
  gap: 10px;
`

export const AudienceItem = styled.div<{
  disabled?: boolean
}>`
  padding: 21px 19px 13px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: ${props => props.theme.noteDefaultBackgroundColor};
  border: 1px solid ${props => props.theme.primaryBorderColor};
  color: ${props => props.theme.extraTextColor};
  gap: 14px;

  ${props => props.disabled && css`
    background-color: ${props => props.theme.widgetColor};
    cursor: not-allowed;

  `}
`

export const AudienceImage = styled.img`
  max-width: 40px;
`

export const AudienceTitle = styled.h4`
  font-size: 13px;
  margin: 0;
  line-height: 22px;
  font-wieght: 400;
`