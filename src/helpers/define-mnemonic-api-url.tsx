type TDefineMnemonicApiURL = (
  chainId: number
) => string | undefined

const defineMnemonicApiURL: TDefineMnemonicApiURL = (
  chainId
) => {
  switch (chainId) {
    case 8453:
      return 'https://base-rest.api.mnemonichq.com'
    default: 
      return
  }
}

export default defineMnemonicApiURL