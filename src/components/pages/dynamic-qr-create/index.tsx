import { FC, useState, useRef } from 'react'
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
import { momentNoOffsetGetTime, createSelectOptions, momentNoOffsetWithTimeUpdate } from 'helpers'

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

const defaultValue = { label: '00', value: '0'}
const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    addDispenser: (
      title: string,
      date: string,
      duration: number,
      dynamic: boolean,
      callback: (id: string | number) => void
    ) => dispatch(asyncDispensersActions.addDispenser({
      title,
      date,
      duration,
      dynamic,
      callback
    })),
    updateDispenser: (
      dispenser_id: string,
      title: string,
      date: string,
      duration: number,
      callback: (id: string | number) => void
    ) => dispatch(asyncDispensersActions.updateDispenser({
      dispenser_id,
      title,
      date,
      duration,
      callback
    })),
  }
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const QRCreate: FC<ReduxType> = ({
  addDispenser,
  loading,
  dispensers,
  updateDispenser
}) => {
  const history = useHistory()
  const { dispenserId } = useParams<TLinkParams>()
  // @ts-ignore
  const currentDispenser: TDispenser | null | undefined = dispenserId ? dispensers.find(item => item.dispenser_id === dispenserId) : null
  const dispenserTitle = currentDispenser ? currentDispenser.title : ''
  const dispenserDate = currentDispenser ? new Date(currentDispenser.claim_start) : new Date()
  const dispenserTime = momentNoOffsetGetTime(currentDispenser?.claim_start)
  const [ date, setDate ] = useState<Date>(dispenserDate)
  const [ hours, setHours ] = useState(dispenserTime.hours)
  const [ minutes, setMinutes ] = useState(dispenserTime.minutes)

  const [ title, setTitle ] = useState<string>(dispenserTitle)

  const inputRef = useRef<HTMLInputElement>(null)
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
            const dateString = momentNoOffsetWithTimeUpdate(date, Number(hours.value), Number(minutes.value))
            addDispenser(
              title,
              dateString,
              1000000000000,
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
