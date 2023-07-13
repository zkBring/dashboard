const addDaysToDate = (
  date: Date,
  addDays: number
) => {
  const dateCopy = new Date(date)
  dateCopy.setDate(dateCopy.getDate() + addDays)
  return dateCopy
}

export default addDaysToDate