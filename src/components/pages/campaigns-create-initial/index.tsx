import { FC, useEffect } from 'react'
import { RootState } from 'data/store';
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TLinkParams, TClaimPattern, TCollection, TCampaign } from 'types'
import { useHistory } from 'react-router-dom'
import { IAppDispatch } from 'data/store'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import {
  Container,
} from 'components/pages/common'
import { preventPageClose } from 'helpers'

const mapStateToProps = ({
  campaigns: {
    campaigns
  },
  campaign: {
    tokenStandard,
    tokenAddress
  },
}: RootState) => ({
  campaigns,
  tokenStandard,
  tokenAddress
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    applyClaimPattern:(
      claimPattern: TClaimPattern,
      isNewCampaign: boolean,
      callback: () => void
    ) => dispatch(
      campaignAsyncActions.applyClaimPattern(
        claimPattern,
        isNewCampaign,
        callback
      )
    )
  }
}

const defineClaimPattern = (
  collections: TCollection[],
  tokenAddress: string
) => {
  const isLinkdropCollection = collections.find(collection => {
    return collection.token_address?.toLowerCase() === tokenAddress.toLowerCase()
  })

  if (isLinkdropCollection) {
    return 'mint'
  }

  return 'transfer'
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const CampaignsCreateInitial: FC<ReduxType> = ({
  campaigns,
  tokenStandard,
  applyClaimPattern,
  tokenAddress
}) => {
  const { type, id } = useParams<TLinkParams>()
  const campaign = id ? campaigns.find(campaign => campaign.campaign_id === id) : null

  const history = useHistory()
  useEffect(preventPageClose(), [])

  const nextStepAction = () => {
    const claimPattern: TClaimPattern = 'transfer'
    applyClaimPattern(
      claimPattern,
      !Boolean(id),
      () => {
        // if (tokenAddress === NATIVE_TOKEN_ADDRESS) {
        //   if (currentCampaign) {
        //     return history.push(`/campaigns/edit/${type}/${currentCampaign.campaign_id}/launch`)
        //   }
        //   return history.push(`/campaigns/new/${type}/launch`)
        // }
        if (campaign) {
          return history.push(`/campaigns/edit/${type}/${campaign.campaign_id}/audience`)
        }
        history.push(`/campaigns/new/${type}/audience`)
      }
    )
  }

  useEffect(() => {
    nextStepAction()
  }, [])

  return <Container>
    
  </Container>
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateInitial)
