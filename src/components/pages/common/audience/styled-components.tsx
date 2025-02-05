import styled from "styled-components"

export const Audience = styled.div`
  display: flex;
  gap: 10px;
`

export const AudienceItem = styled.div`
  padding: 21px 19px 13px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background-color: ${props => props.theme.noteDefaultBackgroundColor};
  border: 1px solid ${props => props.theme.primaryBorderColor};

  gap: 14px;
`

export const AudienceImage = styled.img`
  max-width: 40px;
`

export const AudienceTitle = styled.h4`
  font-size: 13px;
  margin: 0;
  font-wieght: 400;

`