import { FC, useState } from 'react'
import { CheckboxComponent, Buttons } from './styled-components'
import { Button } from 'components/common'
import {
  WidgetContent,
  WidgetSecure,
  WidgetAside
} from '../../styled-components'
import { IAppDispatch } from 'data/store'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'
import { useHistory } from 'react-router-dom'
import { RootState } from 'data/store'
import { connect } from 'react-redux'

const mapStateToProps = ({
  campaign: { type },
}: RootState) => ({
  type
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    secure: (sponsored: boolean, callback: () => void) => {
      dispatch(
        userAsyncActions.secure(sponsored, callback)
      )
    }
  }
}

type ReduxType = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>


const Secure: FC<ReduxType> = ({
  type,
  secure
}) => {
  const [ sponsored, setSponsored ] = useState<boolean>(false)
  const history = useHistory()
  return <WidgetContent>
    <WidgetSecure>
      <CheckboxComponent
        label='0.02 ETH * 2 claims (=0.04 ETH)'
        value={sponsored}
        onChange={value => setSponsored(value)}
      />
      <Buttons>
        <Button
          title='Send'
          onClick={() => {
            secure(
              sponsored,
              () => {
                history.push(`/campaigns/new/${type}/generate`)
              }
            )
          }}
        />
      </Buttons>
    </WidgetSecure>
    <WidgetAside></WidgetAside>
  </WidgetContent>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Secure)