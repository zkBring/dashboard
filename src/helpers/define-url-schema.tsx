const defineUrlSchema = (
  decryptedClaimCode: string,
  claimAppURL: string,
) => {
  const link = `${claimAppURL}/#/redeem/${decryptedClaimCode}?src=d`
  return link
}

export default defineUrlSchema