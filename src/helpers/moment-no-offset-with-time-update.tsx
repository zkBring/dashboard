import moment from 'moment'

const momentNoOffsetWithTimeUpdate = (date: Date, hour: number, minute: number) => {
  const m = moment(date).utcOffset(0)
  m.set({ hour, minute, seconds: 0 })
  m.toISOString()
  return m.format()
}

export default momentNoOffsetWithTimeUpdate