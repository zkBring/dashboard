const getNextDayData = () => {
  const date = new Date()
// add a day
  date.setDate(date.getDate() + 1)
  return date
}

export default getNextDayData