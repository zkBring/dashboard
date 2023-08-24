const generateTokenSymbol = (tokenName: string) => {
  const tokenNameWithNoSpaces = tokenName.replace(' ', '')
  const noVowels = tokenNameWithNoSpaces.replace(/[aeyiou]/gi, '')
  return (noVowels.length > 5 ? noVowels.slice(0, 5) : noVowels).toUpperCase()
}

export default generateTokenSymbol