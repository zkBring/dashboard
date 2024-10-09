import { FC, useState } from 'react'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { Loader } from 'components/common'
import {
  TCampaign,
  TCampaignDraft
} from 'types'
import {
  Header,
  WidgetTitleStyled,
  ContainerButton,
  WidgetComponentStyled,
  LoaderContainer
} from './styled-components'
import {
  InitialNote
} from 'components/pages/common'
import {
  TProps,
  TCampaignsType
} from './types'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import * as campaignsAsyncActions from 'data/store/reducers/campaigns/async-actions'
import { NewCampaign } from './components'
import {
  CampaignsItems,
  Drafts,
  Tabs
} from './components'

const mapStateToProps = ({
  campaigns: {
    campaigns,
    drafts,
    loading
  },
  user: {
    address,
    chainId,
    loading: userLoading
  },
}: RootState) => ({
  campaigns,
  address,
  chainId,
  loading,
  drafts,
  userLoading
})

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

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const getActiveCampaigns = (
  campaigns: TCampaign[]
) => {
  return <CampaignsItems campaigns={campaigns} />
}

const getArchivedCampaigns = (
  campaigns: TCampaign[]
) => {
  return <CampaignsItems campaigns={campaigns} />
}

const getDrafts = (
  drafts: TCampaignDraft[],
  openDraft: (
    id: string,
    callback: () => void
  ) => void,
  deleteDraft: (
    id: string
  ) => void
) => {
  return <Drafts
    deleteDraft={deleteDraft}
    openDraft={openDraft}
    drafts={drafts}
  />
}

const CampaignsPage: FC<ReduxType & TProps> = ({
  campaigns,
  address,
  loading,
  drafts,
  chainId,
  deleteDraft,
  openDraft,
  userLoading
}) => {

  const [
    campagnsType,
    setCampagnsType
  ] = useState<TCampaignsType>('ACTIVE')

  const currentAddressCampaigns = campaigns.filter(campaign => {
    return campaign.creator_address.toLocaleLowerCase() === address.toLocaleLowerCase()
  })

  const [ newCampaignPopup, setNewCampaignPopup ] = useState(false)

  // @ts-ignore
  const currentAddressDrafts = drafts.filter(draft => {
    return draft.creatorAddress.toLocaleLowerCase() === address.toLocaleLowerCase() && draft.chainId === chainId
  })

  const defineContent = () => {
    switch (campagnsType) {
      case 'ACTIVE':
        return getActiveCampaigns(currentAddressCampaigns)
      case 'ARCHIVED':
        return getActiveCampaigns(currentAddressCampaigns.filter(campaign => campaign.archived))
      case 'DRAFTS':
        return getDrafts(
          currentAddressDrafts,
          openDraft,
          deleteDraft
        )
    }
  }

  if (
    loading &&
    currentAddressCampaigns.length === 0
  ) {
    return <LoaderContainer>
      <Loader size='large' />
    </LoaderContainer>
  }

  if (
    currentAddressCampaigns.length === 0 &&
    currentAddressDrafts.length === 0
  ) {
    return <>
      <InitialNote
        title='Create Your First Campaign'
        text="Your campaigns will be displayed here once created. You don't have any campaigns yet"
        onClick={() => {setNewCampaignPopup(true)}}
        buttontText='New Campaign'
      />
      {newCampaignPopup && <NewCampaign onClose={() => setNewCampaignPopup(false)} />}
    </>
  }

  return <>
    <WidgetComponentStyled>
      {newCampaignPopup && <NewCampaign onClose={() => setNewCampaignPopup(false)} />}
      <Header>
        <WidgetTitleStyled>Claim links</WidgetTitleStyled>
        <ContainerButton
          title='+ New'
          disabled={userLoading}
          size='extra-small'
          appearance='action'
          onClick={() => setNewCampaignPopup(true)}
        />
      </Header>

      <Tabs
        setCampagnsType={setCampagnsType}
        activeTab={campagnsType}
      />

      {defineContent()}
    </WidgetComponentStyled>
  </>
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsPage)
