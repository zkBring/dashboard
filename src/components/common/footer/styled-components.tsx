import styled from 'styled-components'

export const Footer = styled.footer`
  padding: 20px 50px;
  display: flex;
  font-size: 12px;
  align-items: center;
  gap: 40px;
`

export const Menu = styled.ul`
  display: flex;
  align-self: center;
  gap: 40px;
  margin: 0;
  padding: 0;
  list-style: none;
`

export const MenuItem = styled.li`

`

export const LinkStyled = styled.a`
  color: ${props => props.theme.primaryTextColor};
  text-decoration: none;
`


export const Version = styled.div`
  color: ${props => props.theme.additionalTextColor};
`