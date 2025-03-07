import styled from 'styled-components'


export const TextComponent = styled.p`
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  color: ${props => props.theme.secondaryTextColor};
  margin: 0;
`