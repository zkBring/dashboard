import { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { WidgetText, WidgetTextBlock, WidgetData } from 'components/common'
import { Button } from 'components/common'
import {
  WidgetContent,
  WidgetSummary
} from '../../styled-components'
import { useHistory } from 'react-router-dom'
import { WidgetSummaryData } from './styled-components'
import Aside from '../aside'
import { IAppDispatch } from 'data/store'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'

const mapStateToProps = ({
  user: {
    address,
    provider,
    chainId
  },
  campaign: { loading, decimals, symbol, assets, type },
}: RootState) => ({
  loading,
  address,
  provider,
  decimals,
  chainId,
  symbol,
  assets,
  type
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    approve: (callback: () => void) => {
      dispatch(
        userAsyncActions.approve(callback)
      )
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>
const Summary: FC<ReduxType> = ({
  assets,
  symbol,
  chainId,
  decimals,
  approve,
  type
}) => {
  const history = useHistory()

  return <WidgetContent>
    <WidgetSummary>
      <WidgetSummaryData>
        <div>
            <WidgetText>
              Links to generate
            </WidgetText>
            <WidgetData>
              {assets?.length}
            </WidgetData>
        </div>
        <div>
            
        </div>
      </WidgetSummaryData>
      <WidgetTextBlock>
        <WidgetText>
          Give Linkdrop contracts permission to transfer tokens from your account to receiver
        </WidgetText>
      </WidgetTextBlock>
      <Button
        title='Approve'
        onClick={() => {
          approve(
            () => {
              history.push(`/campaigns/new/${type}/secure`)
            }
          )
        }}
      />
    </WidgetSummary>
    <Aside

    />
  </WidgetContent>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Summary)