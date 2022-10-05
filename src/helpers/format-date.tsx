import { TFormatDate } from 'types'

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]
const formatDate: TFormatDate = (date) => {
  const dateObj = new Date(date)
  const day = dateObj.getDate()
  const month = dateObj.getMonth()
  const year = dateObj.getFullYear()
  
  return ` ${months[month]} ${day}, ${year}`
}

export default formatDate