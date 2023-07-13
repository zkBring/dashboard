import moment from 'moment'

const momentNoOffsetGetTime = (date?: number) => {
  const m = moment(date || new Date()).utcOffset(0)
  const hours = m.format('HH')
  const minutes = m.format('mm')
  return {
    hours: { label: hours, value: hours },
    minutes: { label: minutes, value: minutes }
  }
}

export default momentNoOffsetGetTime