import { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Container,
  InputComponent,
  ContainerButton,
  Buttons
} from './styled-components'

import {
  WidgetComponent,
  WidgetSubtitle
} from 'components/pages/common'

import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import * as asyncQRsActions from 'data/store/reducers/qrs/async-actions.tsx'

const mapStateToProps = ({
  campaigns: { campaigns },
  qrs: { qrs, loading, uploadLoader },
  user: { address, chainId },
}: RootState) => ({
  campaigns,
  address,
  chainId,
  qrs,
  uploadLoader,
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

const QRCreate: FC<ReduxType> = ({
  addQRSet,
  qrs,
  loading,
  uploadLoader
}) => {
  const history = useHistory()
  const [ title, setTitle ] = useState<string>('')
  const [ amount, setAmount ] = useState<string>('')

  return <Container>
    <WidgetComponent title='New QR set'>
      <InputComponent
        value={title}
        disabled={loading}
        title='Name of the set'
        onChange={value => { setTitle(value); return value }}
      />
      <InputComponent
        value={amount}
        disabled={loading}
        title='Quantity of QR codes'
        onChange={value => {
          if (/^[0-9]+$/.test(value) || value === '') {
            setAmount(value);
          }
          return value
        }}
      />
      <Buttons>
        <ContainerButton
          title='Back'
          appearance='default'
          to='/qrs'
        />
        <ContainerButton
          title={loading ? `Creating ${Math.ceil(uploadLoader * 100)}%` : 'Create'}
          appearance='action'
          loading={loading}
          disabled={!title || !amount || loading}
          onClick={() => {
            if(isNaN(Number(amount))) { return alert('Amount is not valid') }
            addQRSet(
              title, 
              Number(amount),
              (id) => {
                history.push(`/qrs/${id}`)
              }
            )
          }}
        />
      </Buttons>
      
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(QRCreate)
