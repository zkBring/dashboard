import { FC, useState } from 'react'
import { Popup, Button } from 'components/common'
import { useHistory } from 'react-router-dom'
import {
  Container,
  InputComponent,
  ContainerButton
} from './styled-components'

import {
  BatchListLabel,
  BatchListValue,
  WidgetComponent
} from 'components/pages/common'

import { defineQRStatusName } from 'helpers'

import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import * as asyncQRsActions from 'data/store/reducers/qrs/async-actions.tsx'

const mapStateToProps = ({
  campaigns: { campaigns },
  qrs: { qrs, loading },
  user: { address, chainId },
}: RootState) => ({
  campaigns,
  address,
  chainId,
  qrs,
  loading
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    addQRSet: (
      title: string,
      quantity: number,
      callback: (id: string | number) => void
    ) => dispatch(asyncQRsActions.addQRSet({ title, quantity, callback }))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const QRs: FC<ReduxType> = ({
  chainId,
  address,
  addQRSet,
  qrs,
  loading
}) => {
  const history = useHistory()
  const [ popup, showPopup ] = useState<boolean>(false)
  const [ title, setTitle ] = useState<string>('')
  const [ amount, setAmount ] = useState<string>('')


  return <Container>
    <WidgetComponent>
      <InputComponent
        value={title}
        title='Name of the set'
        onChange={value => { setTitle(value); return value }}
      />
      <InputComponent
        value={amount}
        title='Quantity of QR codes'
        onChange={value => { setAmount(value); return value }}
      />
      <ContainerButton
        title='Create'
        appearance='action'
        disabled={!title || !amount}
        onClick={() => {
          if(isNaN(Number(amount))) { return alert('Amount is not valid') }
          addQRSet(
            title, 
            Number(amount),
            (id) => {
              console.log({ id})
            }
          )
        }}
      />
    </WidgetComponent>

  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(QRs)
