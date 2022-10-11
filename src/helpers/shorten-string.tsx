const shortenString = (string: string | undefined) => {
  if (!string) return '...'
  if (string.length < 10) { return string }
  return `${string.slice(0, 5)}...${string.slice(-5)}`
}

export default shortenString