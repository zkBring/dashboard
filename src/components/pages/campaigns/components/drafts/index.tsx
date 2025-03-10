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
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import * as campaignsAsyncActions from 'data/store/reducers/campaigns/async-actions'
import { IAppDispatch } from 'data/store'
import { connect } from 'react-redux'

const defineDraftUrl = (
  createStep: TCampaignCreateStep,
  tokenStandard: TTokenType
) => {
  switch (createStep) {
    case 'approve':
      return `/campaigns/new/${tokenStandard}/audience`
    case 'secure':
      return `/campaigns/new/${tokenStandard}/launch`
    case 'initial':
      return `/campaigns/new/${tokenStandard}/initial`
    default:
      return `/campaigns/new/ERC20/audience`
  }
}

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    openDraft: (
      id: string,
      callback: () => void
    ) => {
      dispatch(
        campaignAsyncActions.openDraft(
          id,
          callback
        )
      )
    },
    deleteDraft: (
      id: string
    ) => {
      dispatch(
        campaignsAsyncActions.removeCampaignFromDrafts(
          id
        )
      )
    }
  }
}

type ReduxType = ReturnType<typeof mapDispatcherToProps>

const Drafts: FC<TProps & ReduxType> = ({
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

export default connect(null, mapDispatcherToProps)(Drafts)