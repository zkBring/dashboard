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
  max-width: 1120px;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
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
`

export const ContainerButton = styled(Button)`
  align-self: end;
  margin-bottom: 0px;
`

export const CollectionsListStyled = styled(BatchList)`
  grid-template-columns: auto auto auto auto 180px;
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

export const TokenImageStyled = styled(TokenImage)`
  margin-right: 10px;
  vertical-align: middle;
`
