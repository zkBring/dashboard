const truncate = (
  str: string,
  n: number,
  suffix: string = '...' 
) => {
  return (str.length > n) ? str.slice(0, n) + suffix : str
}

export default truncate