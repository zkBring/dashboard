const createSelectOptions = (values: number, defaultValue: { label: string, value: string }) => {
  return [defaultValue].concat(Array.from({ length: values }, (_: any, i: number) => {
    const num = i + 1
    const label = num < 10 ? `0${num}` : `${num}`
    return { label, value: `${num}` }
  }))
}

export default createSelectOptions