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
import { ethers } from 'ethers'
import {
  TTransactionStage,
  TLinkParams,
  TStage
} from 'types'
import { useParams } from 'react-router-dom'
import { TCallback } from './types'
import { preventPageClose } from 'helpers'
import Icons from 'icons'
import {
  TransactionsData
} from './components'
import { TAsset } from 'linkdrop-batch-sdk/dist/types'

const mapStateToProps = ({
  campaign: {
    tokenStandard,
    transactionStage,
    loading,
    assets,
    symbol,
    decimals
  },
}: RootState) => ({
  tokenStandard,
  transactionStage,
  loading,
  assets,
  symbol,
  decimals
})

const countAmounts = (
  assets: TAsset[],
  decimals: number
) => {
  const amount = ethers.BigNumber.from(assets[0].amount).mul(assets.length)
  const comission = amount.div(1000).mul(3)
  const totalAmount = amount.add(comission)

  return {
    amount: ethers.utils.formatUnits(amount, decimals),
    comission: ethers.utils.formatUnits(comission, decimals),
    totalAmount: ethers.utils.formatUnits(totalAmount, decimals)
  }
}

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    approve: (totalAmount: string) => dispatch(campaignAsyncActions.prelaunchTransactions.approve(totalAmount)),
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
  totalAmount: string,
  stage: TTransactionStage,
  loading: boolean,
  approve: (totalAmount: string) => void,
  secure: () => void,
  launch: () => void
) => {
  switch (stage) {
    case 'approve':
      return <ButtonStyled onClick={() => {
        approve(totalAmount)
      }} appearance='action' loading={loading}>
        Approve
      </ButtonStyled>

    case 'launch':
      return <ButtonStyled onClick={launch} appearance='action' loading={loading}>
        Launch
      </ButtonStyled>
    case 'initial':
    case 'secure':
      return <ButtonStyled onClick={secure} appearance='action' loading={loading}>
        Deploy contract
      </ButtonStyled>
      }
}

const CampaignsCreateTransactions: FC<ReduxType> = ({
  transactionStage,
  approve,
  secure,
  loading,
  assets,
  symbol,
  decimals
}) => {

  const history = useHistory()
  const stages = defineStages(transactionStage)

  const {
    comission,
    amount,
    totalAmount
  } = countAmounts(
    assets as TAsset[],
    decimals as number
  )

  const button = defineButton(
    totalAmount,
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

    <TransactionsData
      comission={comission}
      amount={amount}
      totalAmount={totalAmount}
      symbol={symbol as string}
    />


    {button}
  </WidgetStyled>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsCreateTransactions)
