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
     
      <WidgetTextBlock>
        <WidgetData>
          Transactions sponsorship option
        </WidgetData>
        <CheckboxComponent
          label='Sponsor claim transactions'
          value={sponsored}
          onChange={value => setSponsored(value)}
        />
      </WidgetTextBlock>
      <WidgetTextBlock>
        <WidgetText>
        Sponsor claim transactions so that users can claim tokens without having {nativeTokenSymbol} in their wallets. You will have to initiate a transaction with {LINK_COMISSION_PRICE} Matic to enable this feature.
        </WidgetText>
        <WidgetText>
        By enabling this feature, gas would be paid by Linkdrop, and Ledger shall be responsible for monthly reimbursement to Company of all transaction and/or gas fees accrued. Please refer to Services Fees and Exhibit D in the signed SaaS Agreement for more details.
        </WidgetText>
      </WidgetTextBlock>
      <Buttons>
        <WidgetButton
          title='Send'
          appearance='action'
          onClick={() => {
            secure(
              sponsored,
              amount,
              () => {
                const redirectURL = campaign ? `/campaigns/edit/${tokenStandard}/${campaign.campaign_id}/generate` : `/campaigns/new/${tokenStandard}/generate`
                history.push(redirectURL)
              }
            )
          }}
        />
      </Buttons>
    </WidgetSecure>
    <TransactionAside />
  </WidgetContent>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Secure)