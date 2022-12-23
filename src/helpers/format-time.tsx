import { TFormatDate } from 'types'

const formatTime: TFormatDate = (date) => {
  const dateObj = new Date(date)
  const hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()
  const seconds = dateObj.getSeconds()
  
  return ` ${hours}:${minutes}:${seconds}`
}

export default formatTime