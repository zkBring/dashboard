import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'

export const ButtonLink = styled(Link)`
  text-decoration: none;
`

export const Anchor = styled.a<{
  children?: React.ReactNode
}>`
  text-decoration: none;
`
