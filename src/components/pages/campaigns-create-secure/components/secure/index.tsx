import { FC } from 'react'
import { CheckboxComponent, Buttons, WidgetButton } from './styled-components'
import { WidgetText, WidgetTextBlock, WidgetData, Loader } from 'components/common'
import {
  WidgetContent,
  WidgetSecure
} from '../../styled-components'
import { IAppDispatch } from 'data/store'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'
import { useHistory } from 'react-router-dom'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { LINK_COMISSION_PRICE } from 'configs/app'
import { multiply, bignumber } from 'mathjs'
import { TransactionAside } from 'components/pages/common'
import { TProps } from './types'

const mapStateToProps = ({
  campaign: {
    tokenStandard,
    assets,
    loading
  },
}: RootState) => ({
  tokenStandard,
  assets,
  loading
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    secure: (sponsored: boolean, amount: string, callback: () => void) => {
      dispatch(
        userAsyncActions.secure(sponsored, amount, callback)
      )
    }
  }
}

type ReduxType = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps> & TProps

const Secure: FC<ReduxType> = ({
  tokenStandard,
  amount,
  secure,
  sponsored,
  setSponsored,
  nativeTokenSymbol,
  assets,
  loading,
  campaign
}) => {
  const history = useHistory()
  if (!LINK_COMISSION_PRICE || !assets) { return null }
  return <WidgetContent>
    {loading && <Loader withOverlay />}
    <WidgetSecure>
      <Buttons>
       
      </Buttons>
    </WidgetSecure>
    <TransactionAside />
  </WidgetContent>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Secure)