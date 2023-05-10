import { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Container,
  InputComponent,
  Buttons,
  DatePickerStyled,
  SelectStyled,
  ContainerButton,
  DateTimeContainer
} from './styled-components'
import moment from 'moment'
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

const defaultValue = { label: '0:00 UTC+0', value: '0:00'}

const selectOptions = [defaultValue].concat(Array.from({ length: 47 }, (_: any, i: number) => {
  const hours = Math.ceil(i / 2)
  const minutes = (i * 30) % 60 === 0 ? '30' : '00'
  return { label: `${hours}:${minutes} UTC+0`, value: `${hours}:${minutes}` }
}))


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
  const momentNoOffset = (date: Date, hour: number, minute: number) => {
    var m = moment(date).utcOffset(0)
    m.set({ hour, minute, seconds: 0 })
    m.toISOString()
    return m.format()
  }
  const [ title, setTitle ] = useState<string>('')
  const [ date, setDate ] = useState<Date>(new Date())
  const [ duration, setDuration ] = useState<string>('')
  const [ time, setTime ] = useState(defaultValue)

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
          note='Enter starting day in MM/DD/YYYY format'
          onChange={(value) => setDate(value)}
          value={date}
        />

        <SelectStyled
          title='Start Time'
          value={time}
          options={selectOptions}
          onChange={(value) => {
            setTime(value)
          }}
        />

      </DateTimeContainer>

      

      <InputComponent
        title='Duration'
        placeholder='90'
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

        <ContainerButton onClick={() => {
          const timeSplitted = time.value.split(':')
          const dateString = momentNoOffset(date, Number(timeSplitted[0]), Number(timeSplitted[1]))
          alert(`
            UTC+0 Time: ${dateString}
            UTC current: ${new Date(dateString)}
          `)
        }}>
        Create
        </ContainerButton>
        
      </Buttons>
      
    </WidgetComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(QRCreate)
