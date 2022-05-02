type TGetNativeTokenSymbol = (chainId: number) => string
const getNativeTokenSymbol: TGetNativeTokenSymbol = (chainId) => {
  switch(chainId) {
    case 100:
      return 'xDAI'
    case 137:
      return 'MATIC'
    default:
      return 'ETH'
  }
}

export default getNativeTokenSymbol