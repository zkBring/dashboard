const defineUrlSchema = (
  decryptedClaimCode: string,
  claimAppURL: string
) => {

  const url = `${claimAppURL}/#/redeem/${decryptedClaimCode}?src=d`
  return url
}

export default defineUrlSchema