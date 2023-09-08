import styled from "styled-components"

export const Container = styled.div``

export const Content = styled.div`
  display: flex;
`

export const TokenImage = styled.img`
  max-width: 104px;
  min-width: 104px;
  height: 105px;
  margin-right: 24px;
  border-radius: 10px;
  object-fit: cover;
`

export const TokenVideo = styled.video`
  max-width: 104px;
  min-width: 104px;
  height: 105px;
  margin-right: 24px;
  border-radius: 10px;
  object-fit: cover;
`

export const TokenData = styled.ul`
  font-size: 16px;
  line-height: 24px;
  list-style: none;
  padding: 0;
  color: ${props => props.theme.primaryTextColor}
`

export const TokenDataItem = styled.li`
  margin-bottom: 10px;
`

export const TokenDataItemProperties = styled(TokenDataItem)`
  margin-bottom: 10px;
  display: flex;
`

export const TokenDataLabel = styled.span`
  color: ${props => props.theme.additionalTextColor};
`

export const TokenDataValue = styled.span`

`

export const TokenDataProperties = styled.ul`
  margin: 0 0 0 20px;
  list-style: none;
  padding: 0;
`

export const TokenDataProperty = styled.li`
  color: ${props => props.theme.propertyTextColor};
  margin-bottom: 4px;
`

export const TokenControls = styled.div`
  display: flex;
  justify-content: flex-end;
`