import { FC, useEffect } from 'react'
import {
  StagesStyled,
  WidgetStyled,
  ButtonStyled
} from './styled-components'
import {
  RootState,
  IAppDispatch
} from 'data/store'
import { connect } from 'react-redux'
import * as campaignAsyncActions from 'data/store/reducers/campaign/async-actions'
import { useHistory } from 'react-router-dom'
import {
  TTransactionStage,
  TLinkParams,
  TStage
} from 'types'
import { useParams } from 'react-router-dom'
import { TCallback } from './types'
import { preventPageClose } from 'helpers'
import Icons from 'icons'

const mapStateToProps = ({
  campaign: {
    tokenStandard,
    transactionStage,
    loading
  },
}: RootState) => ({
  tokenStandard,
  transactionStage,
  loading
})


const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    approve: () => dispatch(campaignAsyncActions.prelaunchTransactions.approve()),
    secure: () => dispatch(campaignAsyncActions.prelaunchTransactions.secure()),
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps>


const defineStages = (
  stage: TTransactionStage
) => {

  const stages: TStage[] = [
    {
      title: 'Create drop contract',
      icon: <Icons.InputDocumentIcon />,
      status: 'next'
    }, {
      title: 'Approve tokens',
      icon: '✓',
      status: 'next'
    }, {
      title: 'Launch',
      icon: <Icons.InputDropIcon />,
      status: 'next'
    }
  ]

  switch (stage) {
    case 'initial':
    case 'secure':
      stages[0].status = 'current'
      return stages

    case 'approve':
      stages[0].status = 'done'
      stages[1].status = 'current'
      return stages

    case 'launch':
      stages[0].status = 'done'
      stages[1].status = 'done'
      stages[2].status = 'current'
      return stages

    default:
      return stages
  }
}


const defineButton = (
  stage: TTransactionStage,
  loading: boolean,
  approve: () => void,
  secure: () => void,
  launch: () => void
) => {
  switch (stage) {
    case 'approve':
      return <ButtonStyled onClick={approve} appearance='action' loading={loading}>
        Approve
      </ButtonStyled>

    case 'launch':
      return <ButtonStyled onClick={launch} appearance='action' loading={loading}>
        Launch
      </ButtonStyled>
    case 'initial':
    case 'secure':
      return <ButtonStyled onClick={secure} appearance='action' loading={loading}>
        Secure
      </ButtonStyled>
      }
}

const CampaignsCreateTransactions: FC<ReduxType> = ({
  transactionStage,
  approve,
  secure,
  loading
}) => {

  const history = useHistory()
  const stages = defineStages(transactionStage)

  const button = defineButton(
    transactionStage,
    loading,
    approve,
    secure,
    () => {
      history.push(`/campaigns/new/ERC20/launch`)
    }
  )

  useEffect(preventPageClose(), [])

  return <WidgetStyled title='Launch drop'>
    <StagesStyled
      stages={stages}
    />
    {button}
  </WidgetStyled>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateTransactions)
