import { FC, useState, useRef } from 'react'
import {
  Container,
  InputComponent,
  Buttons,
  DatePickerStyled,
  SelectStyled,
  ContainerButton,
  DateTimeContainer,
  Note,
  CheckboxStyled
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

const selectOptionsHours = createSelectOptions(23, defaultValue)
const selectOptionsMinutes = createSelectOptions(59, defaultValue)

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

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const QRCreate: FC<ReduxType> = ({
  addDispenser,
  loading,
  dispensers,
  updateDispenser
}) => {
  const history = useHistory()
  const { dispenserId } = useParams<TLinkParams>()
  const currentDispenser: TDispenser | null | undefined = dispenserId ? dispensers.find(item => item.dispenser_id === dispenserId) : null
  const dispenserTitle = currentDispenser ? currentDispenser.title : ''
  const dispenserDate = currentDispenser ? new Date(currentDispenser.claim_start) : new Date()
  const dispenserDuration = currentDispenser ? String(currentDispenser.claim_duration) : ''
  const dispenserTime = momentNoOffsetGetTime(currentDispenser?.claim_start)
  const [ title, setTitle ] = useState<string>(dispenserTitle)
  const [ date, setDate ] = useState<Date>(dispenserDate)
  const [ duration, setDuration ] = useState<string>(dispenserDuration)
  const [ hours, setHours ] = useState(dispenserTime.hours)
  const [ minutes, setMinutes ] = useState(dispenserTime.minutes)
  const [ dynamic, setDynamic ] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  return <Container>
    <WidgetComponent title={currentDispenser ? 'Dispenser edit' : 'New dispenser'}>
      <WidgetSubtitle>Dispenser app is represented by a single link or QR code that you can share for multiple users to scan to claim a unique token. Scanning is limited within a certain timeframe</WidgetSubtitle>
      <InputComponent
        title='Title'
        placeholder='My first dispenser app...'
        value={title}
        onChange={(value: string) => { setTitle(value); return value }}
      />

      <DateTimeContainer>

        <DatePickerStyled
          title='Start date'
          note='Enter start date in the “dd MMM yyyy” format, e.g. “19 Apr 2022”'
          dateFormat='dd MMM yyyy'
          onChange={(value: any) => setDate(value)}
          value={date}
          minDate={new Date(new Date().setDate(new Date().getDate() -1))}
        />

        <SelectStyled
          title='Hours'
          value={hours}
          options={selectOptionsHours}
          onChange={(option) => {
            setHours(option)
            const input: HTMLInputElement | null = inputRef.current
            if (!input) { return }
            input && input.focus()
          }}
        />

        <SelectStyled
          title='Minutes'
          value={minutes}
          options={selectOptionsMinutes}
          onChange={(option) => {
            setMinutes(option)
            const input: HTMLInputElement | null = inputRef.current
            if (!input) { return }
            input && input.focus()
          }}
        />

        <Note>UTC+0</Note>

      </DateTimeContainer>

      <InputComponent
        title='Duration'
        placeholder='90'
        refProp={inputRef}
        value={duration}
        note='Enter duration in minutes '
        onChange={(value: string) => {
          if (value !== '0' && (/^[0-9]+$/.test(value) || value === '')) {
            setDuration(value)
          }
          return value
        }}
      />

      <CheckboxStyled
        label='Dynamic'
        value={dynamic}
        disabled={Boolean(currentDispenser)}
        onChange={(value: boolean) => setDynamic(value)}
        note='Select the checkbox if you want a dynamic QR code after each scan'
      />
      <Buttons>
        <ContainerButton
          to={currentDispenser ? `/dispensers/${currentDispenser.dispenser_id}` : '/dispensers'}
        >
          Back
        </ContainerButton>
        <ContainerButton
          disabled={!title || !duration}
          appearance='action'
          loading={loading}
          onClick={() => {
            const dateString = momentNoOffsetWithTimeUpdate(date, Number(hours.value), Number(minutes.value))
            if (currentDispenser) {
              updateDispenser(
                currentDispenser.dispenser_id as string,
                title,
                dateString,
                Number(duration),
                (id) => history.push(`/dispensers/${id}`)
              )
            } else {
              addDispenser(
                title,
                dateString,
                Number(duration),
                dynamic,
                (id) => history.push(`/dispensers/${id}`)
              )
            }
          }}
        >
          {currentDispenser ? 'Update' : 'Create'}
        </ContainerButton>
      </Buttons>
      
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(QRCreate)
