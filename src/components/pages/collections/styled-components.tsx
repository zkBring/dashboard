import styled from "styled-components"
import { Button } from 'components/common'
import {
  WidgetTitle,
  BatchListValue,
  BatchList,
  BatchListLabel,
  TokenImage
} from 'components/pages/common'

export const Container = styled.div`
  max-width: 1100px;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`

export const WidgetTitleStyled = styled(WidgetTitle)`
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0;
  font-size: 16px;
  line-height: 24px;
`

export const BatchListLabelTextAlignRight = styled(BatchListLabel)`
  text-align: right;
`

export const BatchListValueJustifySelfEnd = styled(BatchListLabel)`
  justify-self: end;
  display: flex;
  justify-content: end;
  gap: 12px;
`

export const ContainerButton = styled(Button)`
  align-self: end;
  margin-bottom: 0px;
`

export const ButtonStyled = styled(Button)``


export const CollectionsListStyled = styled(BatchList)`
grid-template-columns: 158px 224px auto auto auto auto auto;
margin-top: 20px; 
`

export const CollectionsListValueStyled = styled(BatchListValue)`
  display: flex;
  justify-content: flex-end;
`

export const CollectionsListLabelStyled = styled(BatchListValue)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`

export const ErrorSpan = styled.span`
  display: flex;
  align-items: center;
  color: ${props => props.theme.dangerTextColor};

  svg {
    margin-right: 8px;
  }
`

export const UploadedSpan = styled.span`
  color: ${props => props.theme.primaryHighlightColor};
`

export const SecondaryTextSpan = styled.span`
  color: ${props => props.theme.additionalTextColor};
`

export const IconWrapper = styled.span`
  display: inline-block;
  margin-right: 8px;
`