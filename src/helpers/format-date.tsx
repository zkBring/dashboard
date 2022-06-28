import { TFormatDate } from 'types'

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]
const formatDate: TFormatDate = (date) => {
  const dateObj = new Date(date)
  const day = dateObj.getDate()
  const month = dateObj.getMonth()
  const year = dateObj.getFullYear()
  const hours = dateObj.getHours()
  const minutes = dateObj.getMinutes()
  
  return `${day} ${months[month]} ${year} (${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes})`
}

export default formatDate