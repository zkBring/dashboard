const defineProxyContractFunds = async (
  contractAddress: string,
  provider: any
) => {
  return await provider.getBalance(contractAddress)
}
export default defineProxyContractFunds