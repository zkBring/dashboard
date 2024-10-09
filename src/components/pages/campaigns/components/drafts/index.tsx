import { FC } from 'react'
import {
  ButtonStyled,
  BatchListValueFixed,
  BatchListLabelTextAlignRight,
  Buttons,
  DraftsListStyled
} from '../../styled-components'
import {
  BatchListLabel,
  BatchListValue
} from 'components/pages/common'
import { TProps } from './types'
import {
  TCampaignCreateStep,
  TTokenType
} from 'types'
import { TextLink } from 'components/common'
import {
  formatDate,
  shortenString,
  defineExplorerUrl
} from 'helpers'
import Icons from 'icons'
import { useHistory } from 'react-router-dom'

const defineDraftUrl = (
  createStep: TCampaignCreateStep,
  tokenStandard: TTokenType
) => {
  switch (createStep) {
    case 'approve':
      return `/campaigns/new/${tokenStandard}/approve`
    case 'secure':
      return `/campaigns/new/${tokenStandard}/secure`
    case 'initial':
      return `/campaigns/new/${tokenStandard}/initial`
    default:
      return `/campaigns/new`
  }
}


const Drafts: FC<TProps> = ({
  drafts,
  openDraft,
  deleteDraft
}) => {
  const history = useHistory()

  return drafts && drafts.length > 0 ? <DraftsListStyled>
    <BatchListLabel>Created</BatchListLabel>
    <BatchListLabel>Name</BatchListLabel>
    <BatchListLabel>Token</BatchListLabel>
    <BatchListLabelTextAlignRight>Actions</BatchListLabelTextAlignRight>
    {drafts.map(campaign => {
    const {
      id,
      campaign: campaignData,
      step,
      chainId,
      createdAt
    } = campaign
    const scanUrl = defineExplorerUrl(Number(chainId), `/address/${campaignData.tokenAddress}`)

    const dateCreatedFormatted = formatDate(createdAt || '')
    return <>
      <BatchListValue>
        {dateCreatedFormatted}
      </BatchListValue>
      <BatchListValueFixed>{campaignData.title}</BatchListValueFixed>
      <BatchListValue>
        <TextLink href={scanUrl as string} target='_blank'>
          {shortenString(campaignData.tokenAddress as string)}
        </TextLink>
      </BatchListValue>
      <BatchListValue>
        <Buttons>
          <ButtonStyled
            appearance='additional'
            size='extra-small'
            onClick={() => {
              const url = defineDraftUrl(
                step,
                campaignData.tokenStandard as TTokenType
              )

              openDraft(
                String(id),
                () => history.push(url)
              )
            }}
          >
            Continue
          </ButtonStyled>

          <ButtonStyled
            appearance='additional'
            size='extra-small'
            onClick={() => {
              deleteDraft(id as string)
            }}
          >
            <Icons.TrashIcon />
          </ButtonStyled>
        </Buttons>
        
      </BatchListValue>
    </>})}
  </DraftsListStyled> : null
}

export default Drafts