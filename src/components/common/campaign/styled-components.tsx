import styled from 'styled-components'
import { Button } from '../index'
import { Widget } from '../index'

export const Campaign = styled(Widget)`
  position: relative;
`

export const CampaignTitle = styled.h3`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  margin: 0 0 24px;
`

export const CampaignButton = styled(Button)`
  width: 152px;
  min-height: 36px;
`

export const CampaignButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`

export const CampaignText = styled.span`
  font-size: 16px;
  margin: 0;
  color: ${props => props.theme.primaryTextColor};
`

export const CampaignValue = styled(CampaignText)`
  color: ${props => props.theme.additionalTextColor};
`

export const CampaignRow = styled.div`
  margin-bottom: 8px;
`

export const CampaignType = styled.div`
  position: absolute;
  top: 40px;
  background: ${props => props.theme.blankColor};
  color: ${props => props.theme.additionalTextColor};
  padding: 6px 8px;
  border-radius: 5px;
  text-transform: uppercase;
  right: 40px;
  line-height: 1;
`