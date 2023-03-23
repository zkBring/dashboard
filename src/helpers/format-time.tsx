import { TFormatDate } from 'types'

const format = (value: number) => {
  return value < 10 ? `0${value}` : value
}

const formatTime: TFormatDate = (date) => {
  const dateObj = new Date(date)
  const hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()
  const seconds = dateObj.getSeconds()
  const minutesFormatted = format(minutes)
  const secondsFormatted = format(seconds)
  const hoursFormatted = format(hours)
  return ` ${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`
}

export default formatTime