import { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Container,
  Header,
  WidgetTitleStyled,
  ContainerButton
} from './styled-components'

import {
  WidgetComponent
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

const Dispensers: FC<ReduxType> = ({
  addQRSet,
  qrs,
  loading,
  uploadLoader
}) => {
  const history = useHistory()
  const [ title, setTitle ] = useState<string>('')
  const [ amount, setAmount ] = useState<string>('')

  return <Container>
    <WidgetComponent>
      <Header>
        <WidgetTitleStyled>My dispensers</WidgetTitleStyled>
        <ContainerButton
          title='+ Create new'
          size='extra-small'
          appearance='action'
          to='/dispensers/new'
        />
      </Header>
      
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(Dispensers)
