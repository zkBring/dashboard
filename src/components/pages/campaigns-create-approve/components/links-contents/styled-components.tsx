import styled from 'styled-components'

export const LinkContentsItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 24px;
`

export const LinkContentsData = styled.div`
  display: flex;
`

export const LinkContentsControls = styled.div``

export const LinksContentDataItem = styled.div`
  display: flex;
  margin-right: 36px;

  &:last-child {
    margin-right: 0px;
  }
`

export const LinksContentDataLabel = styled.div`
  color: ${props => props.theme.additionalTextColor};
  margin-right  : 8px;  
`

export const LinksContentDataValue = styled.div``


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