import { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { WidgetText, WidgetTextBlock, WidgetData } from 'components/common'
import { Button } from 'components/common'
import {
  WidgetComponent,
  WidgetContent,
  WidgetSummary
} from '../../styled-components'

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
  campaign: { loading, decimals, symbol, assets },
}: RootState) => ({
  loading,
  address,
  provider,
  decimals,
  chainId,
  symbol,
  assets
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    approve: () => {
      dispatch(userAsyncActions.approve())
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>
const Summary: FC<ReduxType> = ({
  assets,
  symbol,
  chainId,
  decimals,
  approve
}) => {
  return <WidgetComponent title='Summary'>
    <WidgetContent>
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
            approve()
          }}
        />
      </WidgetSummary>
      <Aside

      />
    </WidgetContent>
  </WidgetComponent>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Summary)