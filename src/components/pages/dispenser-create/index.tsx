import { FC, useState, useRef } from 'react'
import {
  Container,
  InputComponent,
  Buttons,
  DatePickerStyled,
  SelectStyled,
  ContainerButton,
  DateTimeContainer,
  Note
} from './styled-components'
import moment from 'moment'
import {
  WidgetComponent,
  WidgetSubtitle
} from 'components/pages/common'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import * as asyncDispensersActions from 'data/store/reducers/dispensers/async-actions'
import { useHistory } from 'react-router-dom'

const mapStateToProps = ({
  campaigns: { campaigns },
  dispensers: { loading },
  user: { address, chainId },
}: RootState) => ({
  campaigns,
  address,
  chainId,
  loading
})

const defaultValue = { label: '00', value: '0'}

const createSelectOptions = (values: number, defaultValue: { label: string, value: string }) => {
  return [defaultValue].concat(Array.from({ length: values }, (_: any, i: number) => {
    const num = i + 1
    const label = num < 10 ? `0${num}` : `${num}`
    return { label, value: `${num}` }
  }))
}


const selectOptionsHours = createSelectOptions(23, defaultValue)
const selectOptionsMinutes = createSelectOptions(59, defaultValue)


const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    addDispenser: (
      title: string,
      date: string,
      duration: number,
      callback: (id: string | number) => void
    ) => dispatch(asyncDispensersActions.addDispenser({
      title,
      date,
      duration,
      callback
    }))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const QRCreate: FC<ReduxType> = ({
  addDispenser,
  loading
}) => {
  const history = useHistory()
  const momentNoOffset = (date: Date, hour: number, minute: number) => {
    var m = moment(date).utcOffset(0)
    m.set({ hour, minute, seconds: 0 })
    m.toISOString()
    return m.format()
  }
  const [ title, setTitle ] = useState<string>('')
  const [ date, setDate ] = useState<Date>(new Date())
  const [ duration, setDuration ] = useState<string>('')
  const [ hours, setHours ] = useState(defaultValue)
  const [ minutes, setMinutes ] = useState(defaultValue)

  // const selectCurrentValue = () => {
  //   const currentOption = selectOptions.find(option => option.value === time.value)
  //   if (!currentOption) {
  //     return {label: time.value, value: '12:33'}
  //   }
  //   if (currentOption) {
  //     return currentOption
  //   }
  // }

  const inputRef = useRef<HTMLInputElement>(null)

  return <Container>
    <WidgetComponent title='New dispenser'>
      <WidgetSubtitle>Dispenser app is represented by a single link or QR code that you can share for multiple users to scan to claim a unique token. Scanning is limited within a certain timeframe</WidgetSubtitle>
      <InputComponent
        title='Title'
        placeholder='My first dispenser app...'
        value={title}
        onChange={(value) => { setTitle(value); return value }}
      />

      <DateTimeContainer>

        <DatePickerStyled
          title='Start date'
          note='Enter start date in the “dd MMM yyyy” format, e.g. “19 Apr 2022”'
          dateFormat='dd MMM yyyy'
          onChange={(value) => setDate(value)}
          value={date}
          minDate={new Date()}
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
        onChange={(value) => {
          if (value !== '0' && (/^[0-9]+$/.test(value) || value === '')) {
            setDuration(value)
          }
          return value
        }}
      />
      <Buttons>
        <ContainerButton
          to='/dispensers'
        >
          Back
        </ContainerButton>
        <ContainerButton
          disabled={!title || !duration}
          appearance='action'
          loading={loading}
          onClick={() => {
            const dateString = momentNoOffset(date, Number(hours.value), Number(minutes.value))
            addDispenser(
              title,
              dateString,
              Number(duration),
              (id) => history.push(`/dispensers/${id}`)
            )
          }}
        >
          Create
        </ContainerButton>
        
      </Buttons>
      
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(QRCreate)
