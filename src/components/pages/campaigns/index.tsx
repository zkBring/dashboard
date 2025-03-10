import { FC, useState } from 'react'
import { RootState } from 'data/store'
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
import {
  CampaignsItems,
  Drafts,
  Tabs
} from './components'
import { useHistory } from 'react-router-dom'

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

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps>

const getActiveCampaigns = (
  campaigns: TCampaign[]
) => {
  return <CampaignsItems
    campaigns={campaigns}
  />
}

const getArchivedCampaigns = (
  campaigns: TCampaign[]
) => {
  return <CampaignsItems campaigns={campaigns} />
}

const getDrafts = (
  drafts: TCampaignDraft[]
) => {
  return <Drafts
    drafts={drafts}
  />
}

const CampaignsPage: FC<ReduxType & TProps> = ({
  campaigns,
  address,
  loading,
  drafts,
  chainId,
  userLoading
}) => {

  const [
    campagnsType,
    setCampagnsType
  ] = useState<TCampaignsType>('ACTIVE')

  const currentAddressCampaigns = campaigns.filter(campaign => {
    return campaign.creator_address.toLocaleLowerCase() === address.toLocaleLowerCase()
  })

  const history = useHistory()

  // @ts-ignore
  const currentAddressDrafts = drafts.filter(draft => {
    return draft.creatorAddress.toLocaleLowerCase() === address.toLocaleLowerCase() && draft.chainId === chainId
  })

  const defineContent = () => {
    switch (campagnsType) {
      case 'ACTIVE':
        return getActiveCampaigns(currentAddressCampaigns.filter(campaign => !campaign.archived))
      case 'ARCHIVED':
        return getActiveCampaigns(currentAddressCampaigns.filter(campaign => campaign.archived))
      case 'DRAFTS':
        return getDrafts(
          currentAddressDrafts
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
        title='No drops yet'
        text="Your drops will be displayed here. Launch the first one – It’s easy!"
        onClick={() => {
          history.push('/campaigns/new/ERC20/audience')
        }}
        buttontText='Launch drop'
      />
    </>
  }

  return <WidgetComponentStyled>
    <Header>
      <WidgetTitleStyled>Claim links</WidgetTitleStyled>
      <ContainerButton
        title='+ New'
        disabled={userLoading}
        size='extra-small'
        appearance='action'
        onClick={() => {
          history.push('/campaigns/new/ERC20/audience')
        }}
      />
    </Header>

    <Tabs
      setCampagnsType={setCampagnsType}
      activeTab={campagnsType}
    />

    {defineContent()}
  </WidgetComponentStyled>
}

// @ts-ignore
export default connect(mapStateToProps)(CampaignsPage)
