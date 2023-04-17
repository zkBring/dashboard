import styled from 'styled-components'
import { Widget, Button } from '../index'

export const Campaign = styled(Widget)`
  position: relative;
  padding: 24px 16px;
`

export const CampaignButton = styled(props => <Button {...props} />)`
  width: 100%;
  min-height: 36px;
`

export const CampaignButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 40px;

  a {
    width: 100%;
  }
`

export const CampaignText = styled.span`
  font-size: 13px;
  margin: 0;
  color: ${props => props.theme.additionalTextColor};
`

export const CampaignValue = styled(CampaignText)`
  font-size: 13px;
  color: ${props => props.theme.primaryTextColor};
`

export const CampaignRow = styled.div`
  padding: 6px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Divider = styled.div`
  height: 1px;
  background-color: ${props => props.theme.primaryBorderColor};
  width: 100%;
  margin: 4px 0;
`

export const CampaignTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 16px;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`