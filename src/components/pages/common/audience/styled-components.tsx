import styled, { css } from "styled-components"

export const Audience = styled.div`
  display: flex;
  gap: 10px;
`

export const AudienceItem = styled.div<{
  disabled?: boolean
  active?: boolean
}>`
  padding: 21px 19px 13px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  flex: 1;
  border-radius: 10px;
  background-color: ${props => props.theme.audienceBackgroundColor};
  border: 1px solid ${props => props.theme.audienceBorderColor};
  color: ${props => props.theme.audienceTextColor};
  gap: 14px;
  opacity: .5;

  svg {
    path {
      fill: ${props => props.theme.audienceTextColor};
    }
  }


  ${props => props.disabled && css`
    cursor: not-allowed;
    background-color: ${props => props.theme.audienceDisabledBackgroundColor};
    border: 1px solid ${props => props.theme.audienceDisabledBorderColor};
    color: ${props => props.theme.audienceDisabledTextColor};
  `}

  ${props => props.active && css`
    background-color: ${props => props.theme.audienceActiveBackgroundColor};
    border: 1px solid ${props => props.theme.audienceActiveBorderColor};
    color: ${props => props.theme.audienceActiveTextColor};
    opacity: 1;
    svg {
      path {
        fill: ${props => props.theme.audienceActiveTextColor};
      }
    }
  `}
`

export const AudienceImage = styled.div`
  max-width: 40px;
`

export const AudienceTitle = styled.h4`
  font-size: 13px;
  margin: 0;
  line-height: 22px;
  font-wieght: 400;
`