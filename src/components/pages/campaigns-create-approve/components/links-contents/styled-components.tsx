import styled from 'styled-components'
import { Button } from 'components/common'

export const LinkContentsItem = styled.div`
  display: flex;
  font-size: 14px;
  margin-bottom: 24px;
  align-items: center;
`

export const LinkContentsData = styled.div`
  display: flex;
`

export const LinkContentsControls = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`

export const LinksContentDataItem = styled.div`
  margin-right: 16px;

  &:last-child {
    margin-right: 0px;
  }
`

export const LinksContentDataLabel = styled.div`
  color: ${props => props.theme.primaryTextColor};
  margin-right  : 8px;  
`

export const LinksContentDataValue = styled.div`
  font-size: 11px;
`

export const LinksContentDataValueSpan = styled.span`
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

export const LinksContentImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: contain;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  margin-right: 10px;
`

export const ButtonStyled = styled(Button)`
  min-width: fit-content;
  margin-right: 10px;

  &:last-child {
    margin-right: 0px;
  }
`