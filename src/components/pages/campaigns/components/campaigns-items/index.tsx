import { FC } from 'react'
import {
  CampaignsListStyled,
  ButtonStyled,
  BatchListValueFixed,
  BatchListLabelTextAlignRight,
  BatchListValueJustifySelfEnd,
  TagStyled
} from '../../styled-components'
import {
  BatchListLabel,
  BatchListValue
} from 'components/pages/common'
import { TProps } from './types'
import { Loader, TextLink } from 'components/common'
import {
  formatDate,
  shortenString,
  defineExplorerUrl
} from 'helpers'

const defineCampaignStatus = (
  draft: boolean,
) => {
  if (draft) {
    return <TagStyled
      status='default'
      title='Draft'
    />
  }

  return <TagStyled
  status='success'
    title='Active'
  />
}

const CampaignsItems: FC<TProps> = ({
  campaigns
}) => {

  return <>
    {campaigns && campaigns.length > 0 && <CampaignsListStyled>
      <BatchListLabel>Created</BatchListLabel>
      <BatchListLabel>Name</BatchListLabel>
      <BatchListLabel>Token</BatchListLabel>
      <BatchListLabel>Links</BatchListLabel>
      <BatchListLabel>Claims</BatchListLabel>
      <BatchListLabel>Status</BatchListLabel>
      <BatchListLabelTextAlignRight>Actions</BatchListLabelTextAlignRight>
    {campaigns.map(campaign => {
      const {
        title,
        created_at,
        campaign_id,
        chain_id,
        sponsored,
        links_count,
        token_address,
        links_claimed,
        archived
      } = campaign

      if (archived) {
        return null
      }
      const scanUrl = defineExplorerUrl(Number(chain_id), `/address/${token_address}`)

      const dateCreatedFormatted = formatDate(created_at || '')
      return <>
        <BatchListValue>
          {dateCreatedFormatted}
        </BatchListValue>
        <BatchListValueFixed>{title}</BatchListValueFixed>
        <BatchListValue>
          <TextLink href={scanUrl as string} target='_blank'>
            {shortenString(token_address as string)}
          </TextLink>
        </BatchListValue>
        <BatchListValue>
          {links_count || 0}
        </BatchListValue>
        <BatchListValue>
          {sponsored ? (links_claimed || 0) : 'N/A'}
        </BatchListValue>
        <BatchListValue>
          {defineCampaignStatus(false)}
        </BatchListValue>
        <BatchListValueJustifySelfEnd>
          <ButtonStyled
            appearance='additional'
            size='extra-small'
            to={`/campaigns/${campaign_id}`}
          >
            Manage
          </ButtonStyled>
        </BatchListValueJustifySelfEnd>
      </>})}
    </CampaignsListStyled>}
  </>
  
}

export default CampaignsItems