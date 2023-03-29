const defineEtherscanUrl = (chainId: number | null, value: string) : string => {
  switch (Number(chainId)) {
    case 1: return `https://etherscan.io${value}`
    case 4: return `https://rinkeby.etherscan.io${value}`
    case 5: return `https://goerli.etherscan.io${value}`
    case 137: return `https://polygonscan.com${value}`
    case 80001: return `https://mumbai.polygonscan.com${value}`
    default: return `https://etherscan.io${value}`
  }
}

export default defineEtherscanUrl