import styled from 'styled-components'
import {
  Widget,
  Button,
  Tag
} from 'components/common'
import {
  BatchList,
  WidgetTitle,
  BatchListValue,
  WidgetComponent
} from '../common'

export const Container = styled.div`
  margin-bottom: 36px;
  background: ${props => props.theme.blankColor};
  display: grid;
  grid-template-columns: repeat(auto-fit, 260px);
  grid-gap: 30px;
`

export const TagStyled = styled(Tag)`
`

export const WidgetComponentStyled = styled(WidgetComponent)`
  max-width: 1100px;
`

export const BatchListValueFixed = styled(BatchListValue)`
  width: 224px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 24px;
`

export const ContainerButton = styled(Button)`
  align-self: end;
  margin-bottom: 0px;
`

export const ButtonStyled = styled(Button)``

export const CampaignsListStyled = styled(BatchList)`
  grid-template-columns: 224px 224px auto auto auto auto;
  margin-top: 24px;
`

export const DraftsListStyled = styled(BatchList)`
  grid-template-columns: 224px 224px 1fr max-content;
  margin-top: 24px;
`

export const Title = styled.h2`
  margin: 0 0 24px;
  font-size: 24px;
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

export const Text = styled.p`
  max-width: 350px;
  margin: 0 0 36px;
  font-size: 16px;
`

export const StyledWidget = styled(Widget)`
  margin-bottom: 56px;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

export const WidgetDescription = styled.p`
  font-size: 14px;
  margin: 0 0 40px;
`

export const WidgetButton = styled(Button)`
  padding: 4px 50px;
  width: 100%;
`
