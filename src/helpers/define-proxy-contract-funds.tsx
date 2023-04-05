const defineProxyContractFunds = async (
  contractAddress: string,
  signer: any
) => {
  return await signer.getBalance(contractAddress)
}
export default defineProxyContractFunds