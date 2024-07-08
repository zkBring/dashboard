import { FC, useState } from 'react'
import {
  Container,
  InputComponent,
  Buttons,
  ContainerButton
} from './styled-components'
import {
  WidgetComponent,
  WidgetSubtitle
} from 'components/pages/common'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import * as asyncDispensersActions from 'data/store/reducers/dispensers/async-actions'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { TLinkParams } from './types'
import { TDispenser } from 'types'

const mapStateToProps = ({
  campaigns: { campaigns },
  dispensers: { loading, dispensers },
  user: { address, chainId },
}: RootState) => ({
  campaigns,
  address,
  chainId,
  loading,
  dispensers
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    addDispenser: (
      title: string,
      dynamic: boolean,
      callback: (id: string | number) => void
    ) => dispatch(asyncDispensersActions.createDispenser({
      title,
      dynamic,
      callback
    }))
  }
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const QRCreate: FC<ReduxType> = ({
  addDispenser,
  loading,
  dispensers,
}) => {
  const history = useHistory()
  const { dispenserId } = useParams<TLinkParams>()
  // @ts-ignore
  const currentDispenser: TDispenser | null | undefined = dispenserId ? dispensers.find(item => item.dispenser_id === dispenserId) : null
  const dispenserTitle = currentDispenser ? currentDispenser.title : ''

  const [ title, setTitle ] = useState<string>(dispenserTitle)

  return <Container>
    <WidgetComponent title='New campaign'>
      <WidgetSubtitle>
        Enter the name for campaign. It will be visible only for you
      </WidgetSubtitle>
      <InputComponent
        title='Title'
        placeholder='My dispenser app 01'
        value={title}
        onChange={(value: string) => { setTitle(value); return value }}
      />

      <Buttons>
        <ContainerButton
          to={currentDispenser ? `/dispensers/${currentDispenser.dispenser_id}` : '/dispensers'}
        >
          Back
        </ContainerButton>
        <ContainerButton
          disabled={!title}
          appearance='action'
          loading={loading}
          onClick={() => {
            addDispenser(
              title,
              true,
              (id) => history.push(`/dispensers/${id}`)
            )
          }}
        >
          {currentDispenser ? 'Update' : 'Create'}
        </ContainerButton>
      </Buttons>
      
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(QRCreate)
