import styled from 'styled-components'
import { Button } from 'components/common'

export const PropertyItem = styled.div`
  display: flex;
  font-size: 14px;
  margin-bottom: 24px;
  align-items: center;
`

export const PropertyData = styled.div`
  display: flex;
  align-items: center;
`

export const PropertyControls = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`

export const PropertyDataItem = styled.div`
  margin-right: 16px;

  &:last-child {
    margin-right: 0px;
  }
`

export const PropertyDataLabel = styled.div`
  color: ${props => props.theme.primaryTextColor};
  margin-right  : 8px;  
`

export const PropertyDataValue = styled.div`
  font-size: 11px;
`

export const PropertyDataValueSpan = styled.span`
  color: ${props => props.theme.additionalTextColor};
  margin-right: 4px;
`


export const CheckIndicator = styled.div`
  display: flex;
	align-items: center;
	min-width: 16px;
	justify-content: center;
	height: 16px;
	border-radius: 16px;
	margin-right: 16px;
	background-color: ${props => props.theme.primaryHighlightColor};
`

export const ButtonStyled = styled(Button)`
  min-width: fit-content;
  margin-right: 10px;

  &:last-child {
    margin-right: 0px;
  }
`