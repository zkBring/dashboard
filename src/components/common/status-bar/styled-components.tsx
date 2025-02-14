import styled, { css } from 'styled-components'
import { TStatus } from 'types'

// tagDefaultBackgroundColor: '#E1E9FE',
// tagDefaultBorderColor: '#6793FA',

// tagErrorBackgroundColor: '#FFB4B4',
// tagErrorBorderColor: '#D71E1E',

// tagInfoBackgroundColor: '#FDF0CE',
// tagInfoBorderColor: '#F6B40A',

// tagSuccessBackgroundColor: '#D1FAE1',
// tagSuccessBorderColor: '#19E46A',

export const Container = styled.div<{ type: TStatus }>`
  padding: 20px;
  border-radius: 16px;
  border: 1px solid;
  background-color: ${props => props.theme.statusBarDefaultBackgroundColor};
  border-color: ${props => props.theme.statusBarDefaultBorderColor};
  text-align: center;

  ${props => props.type === 'info' && css`
    background-color: ${props => props.theme.statusBarInfoBackgroundColor};
    border-color: ${props => props.theme.statusBarInfoBorderColor};
  `}


  ${props => props.type === 'success' && css`
    background-color: ${props => props.theme.statusBarSuccessBackgroundColor};
    border-color: ${props => props.theme.statusBarSuccessBorderColor};
  `}
`

export const Title = styled.h3`
  font-size: 16px;
  line-height: 24px;
  margin: 0 0 4px;
  color: ${props => props.theme.primaryTextColor };
  font-weight: 400;
`

export const Value = styled.p`
  font-size: 24px;
  line-height: 32px;
  margin: 0px;
  color: ${props => props.theme.primaryTextColor };
  font-weight: 400;
`
