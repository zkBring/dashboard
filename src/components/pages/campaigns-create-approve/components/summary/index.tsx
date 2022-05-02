import { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { WidgetText, WidgetNote, WidgetTextBlock, WidgetData } from 'components/common'
import { Button } from 'components/common'
import {
  WidgetComponent,
  WidgetContent,
  WidgetSummary
} from '../../styled-components'

import { WidgetSummaryData } from './styled-components'
import Aside from '../aside'

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

type ReduxType = ReturnType<typeof mapStateToProps>
const Summary: FC<ReduxType> = ({
  assets,
  symbol,
  chainId,
  decimals
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
        />
      </WidgetSummary>
      <Aside

      />
    </WidgetContent>
  </WidgetComponent>
}

export default connect(mapStateToProps)(Summary)