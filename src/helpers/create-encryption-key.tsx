const { utils } = require("ethers")

type TCreateEncryptionKey = (
  dashboardKey: string,
  signerAddress: string,
  campaignNumber: string
) => string

const createEncryptionKey: TCreateEncryptionKey = (
  dashboardKey,
  signerAddress,
  campaignNumber
) => {
  const result = utils.keccak256(utils.toUtf8Bytes(
    `${dashboardKey}-${signerAddress}-${campaignNumber}`
  ))
  return result.replace('0x', '')
}

export default createEncryptionKey