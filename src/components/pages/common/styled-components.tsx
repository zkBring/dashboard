import styled from 'styled-components'
import { Widget } from 'components/common'

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1122px;
  align-items: flex-start;
`

export const WidgetContainer = styled.div`
  width: 100%;
`

export const WidgetComponent = styled(Widget)`
  width: 100%;
  position: relative;
  padding: 24px;
  margin-bottom: 24px;
`

export const WidgetAside = styled.div`
  flex: 0 450px;
  min-width: 450px;
  margin-left: 24px;
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const WidgetTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 16px;
  color: ${props => props.theme.primaryTextColor};
`

export const WidgetSubtitle = styled.p`
  font-size: 16px;
  margin: 0 0 36px;
  color: ${props => props.theme.additionalTextColor};
`

export const AsideText = styled.span`
  font-size: 14px;
  margin: 0;
  color: ${props => props.theme.additionalTextColor};
`

export const AsideValue = styled(AsideText)`
  color: ${props => props.theme.primaryTextColor};

  &:first-letter {
    text-transform: uppercase;
  }
`

export const AsideRow = styled.div`
  padding: 6px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
export const AsideValueShorten = styled(AsideValue)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 200px;
`

export const BatchList = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto auto 120px;
  align-items: center;
  grid-gap: 6px;
  margin-bottom: 20px;
  width: 100%;
`

export const BatchListLabel = styled.div`
  font-size: 14px;
  padding: 12px 0;
  color: ${props => props.theme.additionalTextColor};
`

export const BatchListValue = styled.div`
  font-size: 14px;
  color: ${props => props.theme.primaryTextColor};
  padding: 14px 0;
`