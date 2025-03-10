import styled from 'styled-components'
import { Widget } from 'components/common'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 20px;
  width: 100%;
  max-width: 1040px;
  align-items: flex-start;
`

export const WidgetContainer = styled.div`
  width: 100%;
`

export const WidgetComponent = styled(Widget)`
  width: 100%;
  position: relative;
`

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`

export const WidgetTitle = styled.h3` // main title in widget
  font-size: 22px;
  font-weight: 400;
  margin: 0 0 16px;
  color: ${props => props.theme.primaryTextColor};
`

export const WidgetSubtitle = styled.p` 
  font-size: 16px;
  margin: 0 0 20px;
  font-weight: 400;
  color: ${props => props.theme.primaryTextColor};
`

export const WidgetSectionTitle = styled.h4` // main title in widget
  font-size: 16px;
  margin: 0 0 12px;
  color: ${props => props.theme.primaryTextColor};
`

export const WidgetSectionSubtitle = styled.h4` // main title in widget
  font-size: 13px;
  margin: 0 0 12px;
  color: ${props => props.theme.additionalTextColor};
`


export const TableText = styled.span`
  font-size: 13px;
  margin: 0;
  color: ${props => props.theme.secondaryTextColor};
`

export const TableValue = styled(TableText)`
  color: ${props => props.theme.primaryTextColor};

  &:first-letter {
    text-transform: uppercase;
  }
`

export const TableRow = styled.div`
  padding: 6px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`


export const Aside = styled.aside`

`

export const AsideContent = styled.div`
  margin-bottom: 36px;
`

export const AsideDivider = styled.div`
  height: 1px;
  background-color: ${props => props.theme.primaryBorderColor};
  width: 100%;
  margin: 10px 0;
`
export const TableValueShorten = styled(TableValue)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 200px;
`

export const BatchList = styled.div`
  display: inline-grid;
  grid-template-columns: max-content auto auto auto max-content;
  align-items: center;
  grid-gap: 6px;
  margin-bottom: 20px;
  width: 100%;
`

export const BatchListLabel = styled.div`
  font-size: 14px;
  padding: 8px 0;
  color: ${props => props.theme.additionalTextColor};
`

export const BatchListValue = styled.div`
  font-size: 14px;
  color: ${props => props.theme.primaryTextColor};
  padding: 8px 0;
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

export const InputTitle = styled.h3`
  font-size: 16px;
  line-height: 24px;
  margin: 0 0 8px; 
  font-weight: 400;
  color: ${props => props.theme.primaryTextColor};
`

export const InputTitleAdditional = styled.span`
  color: ${props => props.theme.additionalTextColor};
`

export const InputContainer = styled.div``

export const InputSubtitle = styled.h2`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 12px;
  font-weight: 400;
  color: ${props => props.theme.additionalTextColor};
`