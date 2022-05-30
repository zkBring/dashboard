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
import { TCampaign } from 'types'

type TProps = {
  amount: string,
  sponsored: boolean,
  setSponsored: (value: boolean) => void,
  nativeTokenSymbol: string,
  campaign?: TCampaign | null
}

const mapStateToProps = ({
  campaign: {
    type,
    assets,
    loading
  },
}: RootState) => ({
  type,
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
  type,
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
        <WidgetText>Ether will be stored in Linkdrop Contract to distribute into links.</WidgetText>
        <WidgetText>You can stop the campaign anytime and get back your {nativeTokenSymbol}.</WidgetText>
      </WidgetTextBlock>
      <WidgetTextBlock>
        <WidgetData>
          Sponsor claim transactions
        </WidgetData>
        <CheckboxComponent
          label={`${LINK_COMISSION_PRICE} ${nativeTokenSymbol} * ${assets?.length} claims (=${multiply(bignumber(LINK_COMISSION_PRICE), assets?.length)} ${nativeTokenSymbol})`}
          value={sponsored}
          onChange={value => setSponsored(value)}
        />
      </WidgetTextBlock>
      <WidgetTextBlock>
        <WidgetText>
          Sponsor claim transactions so that recipients can claim tokens without having ETH in their wallets. Claim transactions are sponosored when gas price is up to 150 GWEI maximum. Alternatively, the recipients must pay for the gas themselves.
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
                const redirectURL = campaign ? `/campaigns/edit/${type}/${campaign.id}/generate` : `/campaigns/new/${type}/generate`
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